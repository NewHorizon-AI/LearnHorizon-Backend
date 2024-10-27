import { Injectable, NotFoundException } from '@nestjs/common'
import { UserResourceService } from '../resources/user-resource.service'
import { UserDetailsResourceService } from '../resources/user-details-resource.service'

import { CreateUserDto } from '../dtos/user/create-user.dto'

import * as bcrypt from 'bcrypt'

import { User } from '../schemas/user.schema'

import { UpdateUserDto } from '../dtos/user/update-user.dto'

@Injectable()
export class UserService {
  constructor(
    private readonly userResourceService: UserResourceService,
    private readonly userDetailsResourceService: UserDetailsResourceService
  ) {}

  // Crear un usuario con detalles y rol
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.userResourceService.create(createUserDto)
  }

  // Obtener todos los usuarios con detalles y roles
  async findAllUsers(): Promise<User[]> {
    return this.userResourceService.findAll()
  }

  // Obtener un usuario por username, incluyendo detalles y rol
  async findUserByUsername(username: string) {
    return this.userResourceService.findOne(username)
  }

  async findUserByIdentifier(identifier: string) {
    return this.userResourceService.findByIdentifier(identifier)
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userResourceService.update(id, updateUserDto)
  }

  // Eliminar un usuario junto con sus detalles y rol
  async removeUser(id: string) {
    const user = await this.userResourceService.findOne(id)
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`)
    }

    // Eliminar los detalles y rol asociados al usuario
    // await this.userDetailsResourceService.remove(user.details.toString())

    // Eliminar el usuario
    return this.userResourceService.remove(id)
  }

  // Comparar la contraseña ingresada por el usuario con la almacenada
  async comparePasswords(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword)
  }
}
