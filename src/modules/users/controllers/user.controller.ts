import {
  Controller,
  Post,
  Put,
  Get,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
  HttpException,
  HttpStatus
} from '@nestjs/common'

import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'

import { User } from '../schemas/user.schema'

import { UserService } from '../services/user.service'

import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({
    status: 201,
    description: 'El usuario ha sido creado con éxito.',
    type: User
  })
  @ApiResponse({ status: 400, description: 'Username or email already exists' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return this.userService.create(createUserDto)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un usuario existente' })
  @ApiParam({
    name: 'id',
    description: 'ID del usuario',
    example: '607d2f77bcf86cd799439011'
  })
  @ApiResponse({
    status: 200,
    description: 'El usuario ha sido actualizado con éxito.',
    type: User
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    try {
      return this.userService.update(id, updateUserDto)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del usuario',
    example: '607d2f77bcf86cd799439011'
  })
  @ApiResponse({
    status: 200,
    description: 'El usuario ha sido encontrado.',
    type: User
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    try {
      return await this.userService.findOne(id)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del usuario',
    example: '607d2f77bcf86cd799439011'
  })
  @ApiResponse({
    status: 200,
    description: 'El usuario ha sido eliminado con éxito.'
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    try {
      await this.userService.delete(id)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
