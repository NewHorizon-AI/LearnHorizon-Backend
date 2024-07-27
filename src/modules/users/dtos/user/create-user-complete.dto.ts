import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { ValidateNested, IsNotEmpty } from 'class-validator'

// Importamos todos los DTOs necesarios para la creación de un
import { CreateUserDto } from './user-base/create-user.dto'
import { CreateUserContactDto } from './user-contact/create-user-contact.dto'
import { CreateUserDataDto } from './user-data/create-user-data.dto'
import { CreateUserProfileDto } from './user-profile/create-user-profile.dto'
import { CreateUserRoleDto } from './user-role/create-user-role.dto'

export class CreateUserCompleteDto {
  @ApiProperty({
    description: 'Datos del usuario principal',
    type: CreateUserDto
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto

  @ApiPropertyOptional({
    description: 'Contacto del usuario',
    type: CreateUserContactDto
  })
  @ValidateNested()
  @Type(() => CreateUserContactDto)
  contact?: CreateUserContactDto

  @ApiPropertyOptional({
    description: 'Datos adicionales del usuario',
    type: CreateUserDataDto
  })
  @ValidateNested()
  @Type(() => CreateUserDataDto)
  data?: CreateUserDataDto

  @ApiPropertyOptional({
    description: 'Perfil del usuario',
    type: CreateUserProfileDto
  })
  @ValidateNested()
  @Type(() => CreateUserProfileDto)
  profile?: CreateUserProfileDto

  @ApiPropertyOptional({
    description: 'Rol del usuario',
    type: CreateUserRoleDto
  })
  @ValidateNested()
  @Type(() => CreateUserRoleDto)
  role?: CreateUserRoleDto
}
