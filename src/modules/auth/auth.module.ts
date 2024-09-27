import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

// * Importar los controladores
import { AuthController } from './controllers/auth.controllers'

// * Importar los servicios
import { AuthService } from './services/auth.service'

// * Importar modulos necesarios
import { UserModule } from 'src/modules/users/user.module'

@Module({
  imports: [MongooseModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [MongooseModule]
})
export class AuthModule {}
