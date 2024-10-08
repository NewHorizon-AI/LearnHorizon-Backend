import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserDetails } from './schemas/user-details.schema'
import { CreateUserDetailsDto } from './dto/create-user-details.dto'
import { UpdateUserDetailsDto } from './dto/update-user-details.dto'

@Injectable()
export class UserDetailsService {
  constructor(
    @InjectModel(UserDetails.name)
    private readonly userDetailsModel: Model<UserDetails>
  ) {}

  // Crear nuevo UserDetails
  async create(
    createUserDetailsDto: CreateUserDetailsDto
  ): Promise<UserDetails> {
    const createdUserDetails = new this.userDetailsModel(createUserDetailsDto)
    return createdUserDetails.save()
  }

  // Obtener todos los UserDetails
  async findAll(): Promise<UserDetails[]> {
    return this.userDetailsModel.find().exec()
  }

  // Obtener un UserDetails por ID
  async findOne(id: string): Promise<UserDetails> {
    const userDetails = await this.userDetailsModel.findById(id).exec()
    if (!userDetails) {
      throw new NotFoundException(`UserDetails with ID ${id} not found`)
    }
    return userDetails
  }

  // Actualizar UserDetails por ID
  async update(
    id: string,
    updateUserDetailsDto: UpdateUserDetailsDto
  ): Promise<UserDetails> {
    const updatedUserDetails = await this.userDetailsModel
      .findByIdAndUpdate(id, updateUserDetailsDto, { new: true })
      .exec()

    if (!updatedUserDetails) {
      throw new NotFoundException(`UserDetails with ID ${id} not found`)
    }

    return updatedUserDetails
  }

  // Eliminar UserDetails por ID
  async remove(id: string): Promise<UserDetails> {
    const deletedUserDetails = await this.userDetailsModel
      .findByIdAndDelete(id)
      .exec()
    if (!deletedUserDetails) {
      throw new NotFoundException(`UserDetails with ID ${id} not found`)
    }
    return deletedUserDetails
  }
}
