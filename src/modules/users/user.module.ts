import { Module } from '@nestjs/common'
import { UserController } from './controllers/user.controller'
import { UserService } from './services/user.service'
import { MongooseModule } from '@nestjs/mongoose'

// Importacion de los modelos de la base de datos
import { User, UserSchema } from './schemas/user.schema'
import { UserProfile, UserProfileSchema } from './schemas/userProfile.schema'
import { UserContact, UserContactSchema } from './schemas/userContact.schema'
import { UserData, UserDataSchema } from './schemas/UserData.scheme'
import { Role, RoleSchema } from './schemas/role.schema'
import { UserRole, UserRoleSchema } from './schemas/userRole.schema'

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
  providers: [UserService],
  exports: [MongooseModule, UserService] // Exportar el módulo de Mongoose
})
export class UserModule {}
