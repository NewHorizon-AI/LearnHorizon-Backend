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
  [x: string]: any
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private userService: UserService
  ) {}

  // async createCompleteUser(
  //   createUserDto: CreateUserCompleteDto
  // ): Promise<void> {
  //   try {
  //     await this.userBaseService.createUser(createUserDto.user)
  //   } catch (error) {
  //     throw error
  //   }
  // }

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

  async getAllUsers(): Promise<UserResponseDto[]> {
    return this.userService.getAllUsersAccounts()
  }

  // async getUserById(id: string): Promise<User> {
  //   return await this.userModel.findById(id).exec()
  // }

  // async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
  //   const existingUser = await this.userModel.findById(id)
  //   if (!existingUser) {
  //     throw new NotFoundException('User not found')
  //   }

  //   if (updateUserDto.password) {
  //     updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10)
  //   }

  //   Object.assign(existingUser, updateUserDto)
  //   return existingUser.save()
  // }

  // async deleteUser(id: string): Promise<User> {
  //   return await this.userModel.findByIdAndDelete(id).exec()
  // }

  // // async validateUser(email: string, password: string): Promise<User | null> {
  // //   const user = await this.userModel.findOne({ email })
  // //   if (user && (await bcrypt.compare(password, user.password))) {
  // //     return user
  // //   }
  // //   return null
  // // }
}
