import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpCode,
  HttpStatus,
  ConflictException,
  NotFoundException
} from '@nestjs/common'
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto'
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto'
import { User } from 'src/modules/users/schemas/user.schema'
import { UserService } from '../services/user.service'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({
    status: 201,
    description: 'El usuario ha sido creado exitosamente.',
    type: User
  })
  @ApiResponse({
    status: 409,
    description: 'El usuario ya existe.'
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.userService.create(createUserDto)
    } catch (error) {
      throw new ConflictException('User already exists')
    }
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los usuarios.',
    type: [User]
  })
  async findAll(): Promise<User[]> {
    return await this.userService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiResponse({
    status: 200,
    description: 'El usuario ha sido encontrado.',
    type: User
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado.'
  })
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findOne(id)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un usuario' })
  @ApiResponse({
    status: 200,
    description: 'El usuario ha sido actualizado exitosamente.',
    type: User
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado.'
  })
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
  @ApiOperation({ summary: 'Eliminar un usuario' })
  @ApiResponse({
    status: 204,
    description: 'El usuario ha sido eliminado exitosamente.'
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado.'
  })
  async delete(@Param('id') id: string): Promise<void> {
    const user = await this.userService.delete(id)
    if (!user) {
      throw new NotFoundException('User not found')
    }
  }
}
