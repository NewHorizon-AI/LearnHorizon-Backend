import { ApiProperty } from '@nestjs/swagger'
import { IsMongoId } from 'class-validator'

export class CreateUserRoleDto {
  @ApiProperty({
    description: 'ID del usuario al que se le asigna el rol',
    example: '607d2f77bcf86cd799439011'
  })
  @IsMongoId({ message: 'El ID del usuario debe ser un ID válido de MongoDB.' })
  user_id: string

  @ApiProperty({
    description: 'ID del rol asignado',
    example: '60d2f77bcf86cd799439012'
  })
  @IsMongoId({ message: 'El ID del rol debe ser un ID válido de MongoDB.' })
  role_id: string
}
