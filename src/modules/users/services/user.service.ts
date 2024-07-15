import {
  Injectable,
  BadRequestException,
  NotFoundException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { User } from '../schemas/user.schema'

import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'

import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, email } = createUserDto

    // Verificar si el usuario ya existe
    const existingUser = await this.userModel.findOne({
      $or: [{ username }, { email }]
    })
    if (existingUser) {
      throw new BadRequestException('Username or email already exists')
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // Crear un nuevo usuario
    const newUser = new this.userModel({
      username,
      password: hashedPassword,
      email
    })

    return newUser.save()
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec()
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findById(id).exec()
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.userModel.findById(id)
    if (!existingUser) {
      throw new NotFoundException('User not found')
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10)
    }

    Object.assign(existingUser, updateUserDto)
    return existingUser.save()
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id).exec()
  }

  // async validateUser(email: string, password: string): Promise<User | null> {
  //   const user = await this.userModel.findOne({ email })
  //   if (user && (await bcrypt.compare(password, user.password))) {
  //     return user
  //   }
  //   return null
  // }
}
