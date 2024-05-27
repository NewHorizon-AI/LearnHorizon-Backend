import { Module } from '@nestjs/common'
import { UserController } from './controllers/user.controller'
import { UserService } from './services/user.service'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from 'src/modules/users/schemas/user.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ], // Importar el modelo de la base de datos
  controllers: [UserController],
  providers: [UserService],
  exports: [MongooseModule] // Exportar el módulo de Mongoose
})
export class UserModule {}
