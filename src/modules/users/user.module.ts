import { Module } from '@nestjs/common'
import { UserController } from './controllers/user.controller'
import { MongooseModule } from '@nestjs/mongoose'

// Importacion de los modelos de la base de datos
import { User, UserSchema } from './schemas/user.schema'
import { UserProfile, UserProfileSchema } from './schemas/user-profile.schema'
import { UserContact, UserContactSchema } from './schemas/user-contact.schema'
import { UserData, UserDataSchema } from './schemas/user-data.schema'
import { Role, RoleSchema } from './schemas/role.schema'
import { UserRole, UserRoleSchema } from './schemas/user-role.schema'

// Importacion de los servicios
import { UserCompositeService } from './services/user-composite.service'
import { UserService } from './services/user-services/user.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserProfile.name, schema: UserProfileSchema },
      { name: UserContact.name, schema: UserContactSchema },
      { name: UserData.name, schema: UserDataSchema },
      { name: Role.name, schema: RoleSchema },
      { name: UserRole.name, schema: UserRoleSchema }
    ])
  ], // Importar el modelo de la base de datos
  controllers: [UserController],
  providers: [UserService, UserCompositeService],
  exports: [MongooseModule, UserService, UserCompositeService] // Exportar el módulo de Mongoose
})
export class UserModule {}
