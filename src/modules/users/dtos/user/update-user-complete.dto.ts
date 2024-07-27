import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { ValidateNested, IsOptional } from 'class-validator'

import { UpdateUserDto } from './user-base/update-user.dto'
import { UpdateUserContactDto } from './user-contact/update-user-contact.dto'
import { UpdateUserDataDto } from './user-data/update-user-data.dto'
import { UpdateUserProfileDto } from './user-profile/update-user-profile.dto'
import { UpdateUserRoleDto } from './user-role/update-user-role.dto'

export class UpdateUserCompleteDto {
  @ApiPropertyOptional({
    description: 'Datos del usuario principal actualizados',
    type: UpdateUserDto
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateUserDto)
  user?: UpdateUserDto

  @ApiPropertyOptional({
    description: 'Contacto del usuario actualizado',
    type: UpdateUserContactDto
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateUserContactDto)
  contact?: UpdateUserContactDto

  @ApiPropertyOptional({
    description: 'Datos adicionales del usuario actualizados',
    type: UpdateUserDataDto
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateUserDataDto)
  data?: UpdateUserDataDto

  @ApiPropertyOptional({
    description: 'Perfil del usuario actualizado',
    type: UpdateUserProfileDto
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateUserProfileDto)
  profile?: UpdateUserProfileDto

  @ApiPropertyOptional({
    description: 'Rol del usuario actualizado',
    type: UpdateUserRoleDto
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateUserRoleDto)
  role?: UpdateUserRoleDto
}
