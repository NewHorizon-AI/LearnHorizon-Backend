# Documentación arquitectura de backend

## Introducción

Este documento describe la arquitectura backend para. El backend está diseñado para recibir una unica solicitud por parte del frontend y que el backend se encargue de gestionar la creacion de las tablas en la base de datos, la inserción de los datos y la respuesta al frontend.

## DTOs (Data Transfer Objects)

```typescript
//
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({
    description: 'Nombre único de usuario, debe ser único en el sistema',
    example: 'john_doe'
  })
  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio.' })
  @IsString({ message: 'El nombre de usuario debe ser una cadena.' })
  username: string

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'john.doe@example.com'
  })
  @IsEmail({}, { message: 'Debe proporcionar un correo electrónico válido.' })
  email: string

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'Ex@mplePassw0rd2024!'
  })
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @Length(8, 50, {
    message: 'La contraseña debe tener entre 8 y 50 caracteres.'
  })
  @Matches(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,50})/, {
    message:
      'La contraseña debe incluir mayúsculas, minúsculas, números y caracteres especiales.'
  })
  password: string
}
```

## Controlador

El controlador manejará las peticiones HTTP, utilizando el servicio para procesar la creación del producto.

```typescript
// src/products/products.controller.ts
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.'
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async createUser(@Body() createUserDto: CreateUserCompleteDto) {
    return await this.userService.createCompleteUser(createUserDto)
  }
```

## Servicio

Para ajustar el servicio de creación de productos que cumpla con los principios SOLID, es importante enfocarnos en mejorar la separación de responsabilidades, facilitar la extensibilidad y asegurar que el código sea más mantenible. A continuación, reestructuraré el servicio de acuerdo a los principios SOLID, especialmente enfocándome en los principios de Responsabilidad Única (Single Responsibility Principle) y Abierto/Cerrado (Open/Closed Principle).

### Paso 1: Separación de Responsabilidades

Dividiremos las responsabilidades en servicios más pequeños y específicos para cada aspecto del proceso de creación del producto, como manejo de productos, metadatos e inventario.

#### Servicios Específicos

1. **ProductService** - Maneja la creación y manejo de la información del producto.
2. **MetadataService** - Se ocupa de las operaciones relacionadas con los metadatos del producto.
3. **InventoryService** - Administra la información del inventario.

### Paso 2: Implementación de los Servicios

Vamos a definir cada servicio siguiendo los principios SOLID.

```typescript
async createUser(createUserDto: CreateUserDto): Promise<User> {
    if (!createUserDto) {
      throw new Error('createUserDto is required')
    }

    // Verificar si el nombre de usuario ya existe
    const existingUser = await this.userModel
      .findOne({ username: createUserDto.username })
      .exec()
    if (existingUser) {
      throw new ConflictException('Username already exists')
    }

    const newUser = new this.userModel(createUserDto)
    return newUser.save()
  }
```

```typescript
// src/products/services/metadata.service.ts
@Injectable()
export class MetadataService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async createMetadata(data: any, productId: string, session: ClientSession) {
    if (!data) return
    const metadataCollection = this.connection.collection('metadata')
    const metadata = { ...data, productId }
    return await metadataCollection.insertOne(metadata, { session })
  }
}
```

```typescript
// src/products/services/inventory.service.ts
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, ClientSession } from 'mongoose';

@Injectable()
export class InventoryService {
    constructor(@InjectConnection() private readonly connection: Connection) {}

    async createInventory(data: any, productId: string, session?: ClientSession) {
        if (!data) return;
        const inventoryCollection = this.connection.collection('inventory');
        const inventory = { ...data, productId };
        const options = session ? { session } : undefined;
        return await inventoryCollection.insertOne(inventory, options);
    }
}

async createCompleteUser(
    createUserDto: CreateUserCompleteDto
  ): Promise<void> {
    try {
      await this.userBaseService.createUser(createUserDto.user)
    } catch (error) {
      throw error
    }
```

### Paso 3: Integración en el ProductController

Ahora integramos estos servicios en el controlador principal que maneja la creación del producto.

```typescript
// src/products/products.service.ts
import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/mongoose'
import { Connection, ClientSession } from 'mongoose'
import { ProductService } from './services/product.service'
import { MetadataService } from './services/metadata.service'
import { InventoryService } from './services/inventory.service'
import { CreateProductDto } from './dto/create-product.dto'

@Injectable()
export class ProductsService {
  constructor(
    private productService: ProductService,
    private metadataService: MetadataService,
    private inventoryService: InventoryService,
    @InjectConnection() private readonly connection: Connection
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    const session = await this.connection.startSession()
    session.startTransaction()
    try {
      const productResult = await this.productService.createProduct(
        {
          name: createProductDto.name,
          description: createProductDto.description,
          price: createProductDto.price
        },
        session
      )

      await this.metadataService.createMetadata(
        createProductDto.metadata,
        productResult.insertedId,
        session
      )
      await this.inventoryService.createInventory(
        createProductDto.inventory,
        productResult.insertedId,
        session
      )

      await session.commitTransaction()
      return {
        productId: productResult.insertedId,
        message: 'Producto creado con éxito'
      }
    } catch (error) {
      await session.abortTransaction()
      throw error
    } finally {
      session.endSession()
    }
  }
}
```

### Conclusión

Este diseño mejorado responde al Principio de Responsabilidad Única al separar las responsabilidades en diferentes servicios. Cada servicio maneja una parte específica de la operación de base de datos, lo que facilita su mantenimiento y extensión en el futuro. Además, al seguir el Principio Abierto/Cerrado, estos servicios pueden ser fácilmente extendidos sin modificar el código existente, lo que permite una mejor gestión y escalabilidad del código.
