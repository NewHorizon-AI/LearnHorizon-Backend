import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto'
import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto'
import { User } from 'src/schemas/user.schema'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto)
    return await createdUser.save()
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec()
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findById(id).exec()
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec()
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id).exec()
  }
}
