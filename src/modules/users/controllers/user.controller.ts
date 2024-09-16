import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

// * Importar Dtos para consultas
// import { CreateUserCompleteDto } from '../dtos/user/create-user-complete.dto'
// import { UpdateUserCompleteDto } from '../dtos/user/update-user-complete.dto'
import { CreateUserDto } from '../dtos/user/user/create-user.dto'

// * Importar Dtos para respuestas
import { UserResponseDto } from '../dtos/user/user/res/user-response.dto'

// * Importar servicios necesarios
import { UserCompositeService } from '../services/user-composite.service'

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userCompositeService: UserCompositeService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario.' })
  @ApiResponse({
    status: 201,
    description: 'El usuario ha sido creado exitosamente.',
    type: UserResponseDto
  })
  @ApiResponse({
    status: 400,
    description: 'Error en la solicitud.'
  })
  async createUserController(
    @Body() createUserDto: CreateUserDto
  ): Promise<UserResponseDto> {
    return await this.userCompositeService.createDefaultUser(createUserDto)
  }

  // @Post('/complete')
  // @ApiOperation({ summary: 'Create a new user' })
  // @ApiResponse({
  //   status: 201,
  //   description: 'The user has been successfully created.',
  //   type: CreateUserCompleteDto
  // })
  // @ApiResponse({ status: 400, description: 'Bad request.' })
  // async createCompleteUser(@Body() createUserDto: CreateUserCompleteDto) {
  //   return await this.userCompositeService.createCompleteUser(createUserDto)
  // }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios registrados.' })
  @ApiResponse({
    status: 200,
    description: 'Retorno exitoso de todos los usuarios.',
    type: UserResponseDto,
    isArray: true
  })
  async getAllUsersController() {
    try {
      return await this.userCompositeService.getAllUsers()
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  // // ! READ - GET /users

  // @Get(':id')
  // @ApiOperation({ summary: 'Obtener un usuario por su _id' })
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   description: 'Identificador unico de un usuario'
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Usuario encontrado exitosamente.',
  //   type: CreateUserCompleteDto
  // })
  // @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  // async getUserById(@Param('id') id: string): Promise<UserResponseDto> {
  //   return await this.userCompositeService.findUserById(id)
  // }

  // @Put(':id')
  // @ApiOperation({ summary: 'Update a user' })
  // @ApiParam({ name: 'id', type: String, description: 'The user ID' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'The user has been successfully updated.',
  //   type: UpdateUserCompleteDto
  // })
  // @ApiResponse({ status: 404, description: 'User not found.' })
  // async updateUser(
  //   @Param('id') id: string,
  //   @Body() updateUserDto: UpdateUserCompleteDto
  // ) {
  //   return await this.userCompositeService.updateUser(id, updateUserDto)
  // }

  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete a user' })
  // @ApiParam({ name: 'id', type: String, description: 'The user ID' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'The user has been successfully deleted.'
  // })
  // @ApiResponse({ status: 404, description: 'User not found.' })
  // async deleteUser(@Param('id') id: string) {
  //   return await this.userCompositeService.deleteUser(id)
  // }
}
