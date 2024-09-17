/*
  TODO: 
  * updateUserAccount
  * deleteUserAccount
  * getUserAccountById
  * listAllUsers
  */

import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

// * Importar el esquema de usuario
import { User } from '../../schemas/user.schema'

// * Importar DTOs de usuario
import { CreateUserDto } from '../../dtos/user/user/create-user.dto'
import { UpdateUserDto } from '../../dtos/user/user/update-user.dto'

// * Importar Dtos para respuestas
import { UserResponseDto } from '../../dtos/user/user/res/user-response.dto'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // ! CREATE - POST /users

  async createUserAccount(
    createUserDto: CreateUserDto
  ): Promise<UserResponseDto> {
    /*
     * Crear un nuevo usuario en la base de datos
     @Param createUserDto: CreateUserDto
     TODO: Encritar la contraseña utilizando la libreria de bycrypt
     */

    // * Verificar si el usuario ya existe y lanzar una excepción si es así, de forma compacta
    if (await this.userModel.exists({ username: createUserDto.username })) {
      throw new ConflictException('Username already exists')
    }

    const user = await new this.userModel(createUserDto).save()

    // * Crear y guardar el nuevo usuario
    return new UserResponseDto(user)
  }

  // ! READ - GET /users
  async getUserAccountById(id: string): Promise<UserResponseDto> {
    const user = await this.userModel.findById(id).exec()
    if (!user) {
      throw new NotFoundException(
        `No se ha encontrado un usuario con el ID ${id}`
      )
    }
    return new UserResponseDto(user)
  }

  async getAllUsersAccounts(): Promise<UserResponseDto[]> {
    const users = await this.userModel.find().exec()
    return users.map((user) => new UserResponseDto(user))
  }

  // ? Obtener un usuario por su username
  async getUserAccountByUsername(username: string): Promise<UserResponseDto> {
    const user = await this.userModel.findOne({ username }).exec()
    return user ? new UserResponseDto(user) : null
  }

  // !

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec()
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
    return updatedUser
  }

  async deleteUser(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec()
    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
    return deletedUser
  }
}
