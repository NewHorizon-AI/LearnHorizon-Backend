import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'

// * Importar Dtos para consultas

// * Importar Dtos para respuestas
import { UserResponseDto } from '../../dtos/user/user/res/user-response.dto'

// * Importar servicios necesarios
import { UserCompositeService } from '../../services/user-composite.service'

@ApiTags('users')
@Controller('get/u')
export class UserGetController {
  constructor(private readonly userCompositeService: UserCompositeService) {}

  @Get(':username')
  @ApiOperation({ summary: 'Obtener un usuario por su username' })
  @ApiParam({
    name: 'username',
    type: String,
    description: 'Nombre de usuario único'
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado exitosamente.',
    type: UserResponseDto
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  async getUserByUsername(
    @Param('username') username: string
  ): Promise<UserResponseDto> {
    try {
      const user = await this.userCompositeService.getUserByUsername(username)

      if (!user) {
        throw new NotFoundException(
          `Usuario con username "${username}" no encontrado.`
        )
      }

      return user
    } catch (error: any) {
      throw new BadRequestException(error.message)
    }
  }
}
