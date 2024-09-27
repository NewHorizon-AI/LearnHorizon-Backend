### Paso 1: Definición de Clases de Error Personalizadas

Primero, definamos algunas clases de error específicas que ayudarán a manejar distintos tipos de errores que podrían ocurrir durante las operaciones del backend.

```typescript
// src/common/errors/database.error.ts
export class DatabaseError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DatabaseError'
  }
}

// src/common/errors/validation.error.ts
export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}
```

### Paso 2: Servicio con Manejo de Errores Específico

En el servicio, vamos a implementar el manejo de errores considerando errores específicos que podrían ocurrir durante la interacción con la base de datos.

```typescript
// src/products/services/product.service.ts
import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/mongoose'
import { Connection, ClientSession } from 'mongoose'
import { DatabaseError } from '../../common/errors/database.error'

@Injectable()
export class ProductService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async createProduct(data: any, session: ClientSession) {
    const productCollection = this.connection.collection('products')
    try {
      return await productCollection.insertOne(data, { session })
    } catch (error) {
      throw new DatabaseError('Failed to insert product into database')
    }
  }
}
```

### Paso 3: Controlador con Respuestas de Error Personalizadas

El controlador es responsable de capturar estos errores y traducirlos en respuestas HTTP que sean informativas y seguras para el cliente.

```typescript
// src/products/products.controller.ts
import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { ProductsService } from './products.service'
import { DatabaseError, ValidationError } from '../common/errors'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    try {
      const result = await this.productsService.createProduct(createProductDto)
      return result
    } catch (error) {
      if (error instanceof DatabaseError) {
        throw new HttpException(
          'Database operation failed',
          HttpStatus.INTERNAL_SERVER_ERROR
        )
      } else if (error instanceof ValidationError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
      } else {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        )
      }
    }
  }
}
```

### Conclusión

En esta implementación, el servicio se ocupa exclusivamente de la lógica de negocio y las operaciones de la base de datos, incluido su propio manejo de errores. El controlador gestiona la interacción con el cliente, asegurándose de que los errores se traducen en respuestas HTTP adecuadas y personalizadas. Esta separación de responsabilidades mantiene el código limpio, modular y fácil de mantener, alineado con los principios SOLID, en particular el Principio de Responsabilidad Única.
