import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

// Importar DTOs de usuario
import { CreateUserDto } from '../../dtos/user/user-base/create-user.dto'
import { UpdateUserDto } from '../../dtos/user/user-base/update-user.dto'

// Importar el esquema de usuario
import { User } from '../../schemas/user.schema'

@Injectable()
export class UserBaseService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    if (!createUserDto) {
      throw new Error('createUserDto is required')
    }

    // Verificar si el nombre de usuario ya existe
    const existingUser = await this.userModel
      .findOne({ username: createUserDto.username })
      .exec()
    if (existingUser) {
      throw new ConflictException('Username already exists')
    }

    const newUser = new this.userModel(createUserDto)
    return newUser.save()
  }

  async findAllUsers(): Promise<User[]> {
    return this.userModel.find().exec()
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec()
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
    return user
  }

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
