# Proyecto NestJS con Arquitectura Descentralizada

Este proyecto está diseñado siguiendo principios de arquitectura **descentralizada** y **SOLID**, utilizando **NestJS** como framework principal, junto con **Mongoose** para la interacción con MongoDB.

## Estructura del Proyecto

La aplicación está dividida en módulos, y cada módulo contiene las carpetas necesarias para la correcta separación de responsabilidades. A continuación se detalla la estructura del módulo `users/`, que maneja la entidad **User**:

```bash
users/
├── controller/   # Controladores que manejan las solicitudes HTTP.
├── service/      # Servicios que contienen la lógica de negocio.
├── repository/   # Acceso directo a la base de datos (ODM/ORM) como Mongoose.
├── dto/          # Definición de Data Transfer Objects para validaciones de entrada.
├── schema/       # Esquema de Mongoose para la entidad User.
├── mapper/       # Mapeo entre objetos (Entity-DTO o Entity-Response).
└── docs/         # Documentación API del módulo (Swagger, OpenAPI).
```

### 1. **`controller/`**

Los **Controladores** se encargan de recibir las solicitudes HTTP y delegar la lógica de negocio a los **Servicios** correspondientes. Aquí no se realiza ninguna lógica de negocios ni interacción con la base de datos. Cada acción (GET, POST, PUT, DELETE) tiene su propio controlador segregado.

- **Responsabilidad**: Recibir peticiones HTTP y delegar el procesamiento al servicio adecuado.
- **Ejemplo**: `get-user.controller.ts`, `create-user.controller.ts`, `update-user.controller.ts`.

```typescript
@Controller('users')
export class GetUserController {
  constructor(private readonly getUserService: GetUserService) {}

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.getUserService.execute(id)
  }
}
```

### 2. **`service/`**

Los **Servicios** contienen toda la lógica de negocios. Aquí es donde se procesan los datos, se aplican validaciones y reglas de negocio. Cada servicio está segregado por la operación que realiza: creación, lectura, actualización o eliminación de usuarios.

- **Responsabilidad**: Gestionar la lógica de negocio y procesar los datos recibidos o enviados.
- **Ejemplo**: `get-user.service.ts`, `create-user.service.ts`, `update-user.service.ts`.

```typescript
@Injectable()
export class GetUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string) {
    const user = await this.userRepository.findOneById(id)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }
}
```

### 3. **`repository/`**

El **Repositorio** es la capa que interactúa directamente con la base de datos. Utilizando **Mongoose** (u otro ODM/ORM), esta capa gestiona la persistencia de los datos. El repositorio se encarga de las operaciones CRUD básicas (crear, leer, actualizar, eliminar) en la base de datos.

- **Responsabilidad**: Acceso directo a la base de datos y gestión de las operaciones CRUD.
- **Ejemplo**: `user.repository.ts`.

```typescript
@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async findOneById(id: string): Promise<User | null> {
    return await this.userModel.findById(id).exec()
  }

  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user)
    return await newUser.save()
  }

  // Otras operaciones CRUD
}
```

### 4. **`dto/` (Data Transfer Objects)**

Los **DTOs** definen los esquemas de datos que se reciben y envían a través de las solicitudes HTTP. También se utilizan para realizar validaciones y asegurar que los datos entrantes sean correctos antes de procesarlos.

- **Responsabilidad**: Validar y definir la estructura de los datos entrantes y salientes.
- **Ejemplo**: `create-user.dto.ts`, `update-user.dto.ts`.

```typescript
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(8)
  password: string
}
```

### 5. **`schema/`**

Los **Schemas** definen la estructura de los documentos en MongoDB. En el caso de Mongoose, estos esquemas se mapean a modelos de MongoDB que representan colecciones en la base de datos.

- **Responsabilidad**: Definir la estructura de la entidad User en MongoDB.
- **Ejemplo**: `user.schema.ts`.

```typescript
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
  password: string
}

export const UserSchema = SchemaFactory.createForClass(User)
```

### 6. **`mapper/`**

El **Mapper** se encarga de transformar los datos entre los diferentes niveles de la aplicación. Por ejemplo, convierte los DTOs en entidades que pueden ser almacenadas en la base de datos, y viceversa. Esto asegura que siempre se manejen los datos con el formato adecuado en cada capa.

- **Responsabilidad**: Convertir DTOs en entidades y viceversa, asegurando la consistencia de los datos.
- **Ejemplo**: `user.mapper.ts`.

```typescript
@Injectable()
export class UserMapper {
  dtoToEntity(createUserDto: CreateUserDto): User {
    const user = new User()
    user.name = createUserDto.name
    user.email = createUserDto.email
    user.password = createUserDto.password
    return user
  }

  entityToDto(user: User): UserDto {
    return {
      name: user.name,
      email: user.email
      // Otras conversiones
    }
  }
}
```

### 7. **`docs/`**

Este directorio contiene la documentación de la API generada automáticamente utilizando herramientas como **Swagger** o **OpenAPI**. Aquí puedes encontrar la documentación de los diferentes endpoints, sus parámetros, respuestas, y posibles errores.

- **Responsabilidad**: Documentar los endpoints de la API y cómo utilizarlos.
- **Ejemplo**: `user.docs.ts`.

```typescript
@ApiTags('Users')
@Controller('users')
export class CreateUserController {
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    // Lógica del controlador
  }
}
```

## Principios de Diseño Aplicados

### 1. **Single Responsibility Principle (SRP)**

Cada carpeta y archivo tiene una única responsabilidad. Por ejemplo, los controladores se enfocan únicamente en manejar las solicitudes HTTP, mientras que los servicios contienen la lógica de negocio y los repositorios interactúan con la base de datos.

### 2. **Open/Closed Principle (OCP)**

El sistema está diseñado para ser fácilmente extensible sin necesidad de modificar el código existente. Nuevas funcionalidades o cambios pueden ser introducidos creando nuevos servicios, controladores, o DTOs sin alterar los existentes.

### 3. **Liskov Substitution Principle (LSP)**

Se garantiza que cualquier implementación o extensión de la funcionalidad respete las interfaces y contratos definidos, asegurando la intercambiabilidad de las clases.

### 4. **Interface Segregation Principle (ISP)**

Los DTOs y servicios están separados y no contienen más de lo necesario para cumplir con su objetivo. Cada entidad solo expone lo que necesita, asegurando que no haya dependencias innecesarias.

### 5. **Dependency Inversion Principle (DIP)**

Las dependencias están inyectadas y gestionadas por **NestJS** a través de la inyección de dependencias, lo que facilita la escalabilidad y el testeo.
