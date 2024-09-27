import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsMongoId } from 'class-validator'

export class UpdateUserRoleDto {
  @ApiPropertyOptional({
    description: 'ID del usuario al que se le asigna el rol',
    example: '607d2f77bcf86cd799439011'
  })
  @IsOptional()
  @IsMongoId({ message: 'El ID del usuario debe ser un ID válido de MongoDB.' })
  user_id?: string

  @ApiPropertyOptional({
    description: 'ID del rol asignado',
    example: '60d2f77bcf86cd799439012'
  })
  @IsOptional()
  @IsMongoId({ message: 'El ID del rol debe ser un ID válido de MongoDB.' })
  role_id?: string
}
