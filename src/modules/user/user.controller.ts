import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpCode,
  HttpStatus
} from '@nestjs/common'
import { ConflictException, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from 'src/dto/user/create-user.dto'
import { UpdateUserDto } from 'src/dto/user/update-user.dto'
import { User } from 'src/schemas/user.schema'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.userService.create(createUserDto)
    } catch (error) {
      throw new ConflictException('User already exists')
    }
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findOne(id)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    const user = await this.userService.update(id, updateUserDto)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    const user = await this.userService.delete(id)
    if (!user) {
      throw new NotFoundException('User not found')
    }
  }
}
