import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

// import * as bcrypt from 'bcrypt'

// * Importar el Modelo de Usuario
import { User } from 'src/modules/users/schemas/user.schema'

// * Importar Dtos Necesarios
import { LoginUserDto } from '../dto/login-user.dto'
import { UserResponseDto } from '../dto/user-response.dto'

import { UserService } from 'src/modules/users/services/user.service'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async login(login: LoginUserDto): Promise<UserResponseDto> {
    /*
     * Inicio de sesion utilizando el email o el username del usuario y la contraseña proporcionada
     @Param login: LoginUserDto - Dto con los datos de inicio de sesion
     TODO: Implementar la comparacion de contraseñas encriptadas
     */

    const user = await this.userModel.findOne({
      $or: [{ email: login.email }, { username: login.username }]
    })

    // * Verificar si existe el usuario y si la contraseña es correcta
    if (user && login.password === user.password) {
      return new UserResponseDto(user)
    }

    // * Si no se encuentra el usuario o la contraseña no coincide
    throw new UnauthorizedException('Credenciales incorrectas.')
  }

  async validateUser(loginUserDto: LoginUserDto): Promise<User | null> {
    const user = await this.userService.findUserByIdentifier(loginUserDto.email)

    if (
      user &&
      (await this.userService.comparePasswords(
        loginUserDto.password,
        user.password
      ))
    ) {
      // Si las contraseñas coinciden, devolver el usuario
      return user
    }

    return null // Si no coinciden, devolver null
  }
}
