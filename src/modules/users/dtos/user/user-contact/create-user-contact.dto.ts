import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsMongoId, IsString } from 'class-validator'

export class CreateUserContactDto {
  @ApiProperty({
    description: 'ID del usuario',
    example: '607d2f77bcf86cd799439011'
  })
  @IsNotEmpty({ message: 'El ID del usuario es obligatorio.' })
  @IsMongoId({ message: 'El ID del usuario debe ser un ID válido de MongoDB.' })
  user_id: string

  @ApiProperty({
    description: 'Dirección del usuario',
    example: '123 Main St, City, Country'
  })
  @IsOptional()
  @IsString({ message: 'La dirección debe ser una cadena de texto.' })
  address?: string

  @ApiProperty({
    description: 'Teléfono del usuario',
    example: '+123456789'
  })
  @IsNotEmpty({ message: 'El teléfono es obligatorio.' })
  @IsString({ message: 'El teléfono debe ser una cadena de texto.' })
  phone: string
}
