import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

// Importar los DTOs de usuario
import { CreateUserCompleteDto } from '../dtos/user/create-user-complete.dto'
// import { UpdateUserCompleteDto } from '../dtos/user/update-user-complete.dto'

// Importar el esquema de usuario
import { User } from '../schemas/user.schema'

// Importar los servicios necesarios
import { UserBaseService } from './user-base/user-base.service'

// import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  [x: string]: any
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private userBaseService: UserBaseService
  ) {}

  async createCompleteUser(
    createUserDto: CreateUserCompleteDto
  ): Promise<void> {
    try {
      await this.userBaseService.createUser(createUserDto.user)
    } catch (error) {
      throw error
    }
  }

  // async findAllUsers(): Promise<User[]> {
  //   return await this.userModel.find().exec()
  // }

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
