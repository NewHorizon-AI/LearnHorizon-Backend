import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

// Importacion de los modelos de la base de datos
import { User, UserSchema } from './schemas/user.schema'
import { UserDetails, UserDetailsSchema } from './schemas/user-details.schema'

// * Importar controladores
import { UserController } from './controllers/user.controller'

// * Importar servicios
import { UserService } from './services/user.service'

// Importacion de los recursos
import { UserResourceService } from './resources/user-resource.service'
import { UserDetailsResourceService } from './resources/user-details-resource.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserDetails.name, schema: UserDetailsSchema }
    ])
  ], // Importar el modelo de la base de datos
  controllers: [UserController],
  providers: [UserService, UserResourceService, UserDetailsResourceService],
  exports: [MongooseModule, UserService] // Exportar el módulo de Mongoose
})
export class UserModule {}
