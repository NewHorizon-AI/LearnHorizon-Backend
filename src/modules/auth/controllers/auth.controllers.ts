import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

// * Importar Dtos necesarios
import { LoginUserDto } from '../dto/login-user.dto'
import { UserResponseDto } from '../dto/user-response.dto'

// * Importar los Servicios necesarios
import { AuthService } from '../services/auth.service'

@ApiTags('auths')
@Controller('auths')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Loggearse.' })
  @ApiResponse({
    status: 201,
    description: 'El usuario ha sido loggeado exitosamente.',
    type: UserResponseDto
  })
  @ApiResponse({
    status: 400,
    description: 'Error en la solicitud.'
  })
  async login(@Body() login: LoginUserDto) {
    return await this.authService.login(login)
  }

  @Post('login/v2')
  @ApiOperation({ summary: 'Loggearse.' })
  @ApiResponse({
    status: 201,
    description: 'El usuario ha sido loggeado exitosamente.',
    type: UserResponseDto
  })
  @ApiResponse({
    status: 400,
    description: 'Error en la solicitud.'
  })
  async loginv2(@Body() login: LoginUserDto) {
    return await this.authService.validateUser(login)
  }
}
