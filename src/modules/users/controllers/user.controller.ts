import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'

// Importing DTOs
import { CreateUserCompleteDto } from '../dtos/user/create-user-complete.dto'
import { UpdateUserCompleteDto } from '../dtos/user/update-user-complete.dto'

// Importing Service
import { UserService } from '../services/user.service'

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.'
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async createUser(@Body() createUserDto: CreateUserCompleteDto) {
    return await this.userService.createCompleteUser(createUserDto)
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Returned all users.',
    type: CreateUserCompleteDto,
    isArray: true
  })
  async getAllUsers() {
    return await this.userService.findAllUsers()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', type: String, description: 'The user ID' })
  @ApiResponse({
    status: 200,
    description: 'Returned the user.',
    type: CreateUserCompleteDto
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getUserById(@Param('id') id: string) {
    return await this.userService.findUserById(id)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({ name: 'id', type: String, description: 'The user ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
    type: UpdateUserCompleteDto
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserCompleteDto
  ) {
    return await this.userService.updateUser(id, updateUserDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', type: String, description: 'The user ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.'
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id)
  }
}
