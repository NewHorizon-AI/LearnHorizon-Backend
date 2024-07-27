import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsMongoId, IsString } from 'class-validator'

export class UpdateUserContactDto {
  @ApiPropertyOptional({
    description: 'ID del usuario',
    example: '607d2f77bcf86cd799439011'
  })
  @IsOptional()
  @IsMongoId({ message: 'El ID del usuario debe ser un ID válido de MongoDB.' })
  user_id?: string

  @ApiPropertyOptional({
    description: 'Dirección del usuario',
    example: '123 Main St, New City, New Country'
  })
  @IsOptional()
  @IsString({ message: 'La dirección debe ser una cadena de texto.' })
  address?: string

  @ApiPropertyOptional({
    description: 'Teléfono del usuario',
    example: '+123456789'
  })
  @IsOptional()
  @IsString({ message: 'El teléfono debe ser una cadena de texto.' })
  phone?: string
}
