import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'
import { UserService } from '../services/user.service'

import { CreateUserDto } from '../dtos/user/create-user.dto'

import { User } from '../schemas/user.schema'

import { UpdateUserDto } from '../dtos/user/update-user.dto'

@ApiTags('users') // Etiqueta Swagger para agrupar las operaciones relacionadas a usuarios
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Crear un usuario con detalles y rol
  @ApiOperation({ summary: 'Crear un usuario con sus detalles y rol' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  @ApiResponse({
    status: 409,
    description: 'Nombre de usuario ya está en uso.'
  })
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto)
  }

  // Obtener todos los usuarios con detalles y roles
  @ApiOperation({
    summary: 'Obtener todos los usuarios con sus detalles y roles'
  })
  @ApiResponse({
    status: 200,
    description: 'Listado de usuarios obtenido exitosamente.'
  })
  @Get()
  async findAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers()
  }

  // Obtener un usuario por ID, incluyendo detalles y rol
  @ApiOperation({
    summary: 'Obtener un usuario por su ID, incluyendo detalles y rol'
  })
  @ApiParam({ name: 'username', description: 'username del usuario a obtener' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @Get('/:username')
  async findUserById(@Param('username') username: string) {
    return this.userService.findUserByUsername(username)
  }

  // Actualizar un usuario, detalles y rol
  @ApiOperation({ summary: 'Actualizar un usuario, incluyendo detalles y rol' })
  @ApiParam({ name: 'id', description: 'ID del usuario a actualizar' })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado exitosamente.'
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto)
  }

  // Eliminar un usuario junto con sus detalles y rol
  @ApiOperation({ summary: 'Eliminar un usuario, incluyendo detalles y rol' })
  @ApiParam({ name: 'id', description: 'ID del usuario a eliminar' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @Delete(':id')
  async removeUser(@Param('id') id: string) {
    return this.userService.removeUser(id)
  }
}
