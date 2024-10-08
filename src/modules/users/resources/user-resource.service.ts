import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { User } from '../schemas/user.schema'

import { CreateUserDto } from '../dtos/user/create-user.dto'
import { UpdateUserDto } from '../dtos/user/update-user.dto'

import * as bcrypt from 'bcrypt'

@Injectable()
export class UserResourceService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  // Crear un nuevo usuario
  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
    createUserDto.password = hashedPassword

    const createdUser = new this.userModel(createUserDto).save()

    return createdUser
  }

  // Obtener todos los usuarios
  async findAll(): Promise<User[]> {
    return this.userModel.find().populate('details').exec()
  }

  // Obtener un usuario por ID
  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).populate('details').exec()

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`)
    }
    return user
  }

  // Buscar por id, email o username
  async findByIdentifier(identifier: string): Promise<User> {
    const user = await this.userModel
      .findOne({
        $or: [
          { email: identifier }, // Busca por email
          { username: identifier } // Busca por username
        ]
      })
      .exec()

    if (!user) {
      throw new NotFoundException(
        `User with identifier "${identifier}" not found`
      )
    }

    return user
  }

  // Actualizar un usuario por ID
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 10)
      updateUserDto.password = hashedPassword
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .populate('details')
      .exec()

    if (!updatedUser) {
      throw new NotFoundException(`User with ID "${id}" not found`)
    }
    return updatedUser
  }

  // Eliminar un usuario por ID
  async remove(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id).exec()
    if (!result) {
      throw new NotFoundException(`User with ID "${id}" not found`)
    }
  }
}
