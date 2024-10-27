import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
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
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
      createUserDto.password = hashedPassword

      const createdUser = new this.userModel(createUserDto)
      return await createdUser.save()
    } catch (error) {
      if (error.code === 11000) {
        // Error de clave duplicada en MongoDB
        throw new ConflictException('El nombre de usuario ya está en uso')
      }
      throw new BadRequestException({ message: error.message })
    }
  }

  // Obtener todos los usuarios
  async findAll(): Promise<User[]> {
    return this.userModel.find().populate('details').exec()
  }

  // Obtener un usuario por ID
  async findOne(username: string): Promise<User> {
    const user = await this.userModel
      .findOne({ username: username })
      .populate('details')
      .exec()

    if (!user) {
      throw new NotFoundException(
        `El usuario con el username: "${username}" no existe`
      )
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
