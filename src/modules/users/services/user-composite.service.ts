/*
TODO: 
* getUserCompositeDetails
* updateUserCompositeProfile
* deleteUserCompositeData
* synchronizeUserComposite
* listCompositeUserRoles
*/

import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

// * Importar el esquema de usuario
import { User } from '../schemas/user.schema'

// * Importar Dtos para consultas
import { CreateUserDto } from '../dtos/user/user/create-user.dto'

// * Importar Dtos para respuestas
import { UserResponseDto } from '../dtos/user/user/res/user-response.dto'

// * Importar los servicios necesarios
import { UserService } from './user-services/user.service'

// import * as bcrypt from 'bcrypt'

@Injectable()
export class UserCompositeService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private userService: UserService
  ) {}

  // ! CREATE - POST /users

  async createDefaultUser(
    createUserDto: CreateUserDto
  ): Promise<UserResponseDto> {
    return await this.userService.createUserAccount(createUserDto)
  }

  // ! READ - GET /users

  async getUserById(id: string): Promise<UserResponseDto> {
    // * Validar que se haya entregado un ID
    if (!id) {
      throw new BadRequestException('No se ha proporcionado un ID de usuario')
    }
    return await this.userService.getUserAccountById(id)
  }

  // ? Obtener un usuario por su username
  async getUserByUsername(username: string): Promise<UserResponseDto> {
    return await this.userService.getUserAccountByUsername(username)
  }

  async getAllUsers(): Promise<UserResponseDto[]> {
    return this.userService.getAllUsersAccounts()
  }
}
