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
import { UserService } from './services/user.service'
import { UserBaseService } from './services/user-base/user-base.service'

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
  providers: [UserService, UserBaseService],
  exports: [MongooseModule, UserService, UserBaseService] // Exportar el módulo de Mongoose
})
export class UserModule {}
