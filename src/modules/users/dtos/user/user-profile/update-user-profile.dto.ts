import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString, IsUrl, IsDate } from 'class-validator'

export class UpdateUserProfileDto {
  @ApiPropertyOptional({
    description: 'Nombre del usuario',
    example: 'John Doe'
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  name?: string

  @ApiPropertyOptional({
    description: 'Biografía del usuario',
    example: 'Desarrollador de software actualizado.'
  })
  @IsOptional()
  @IsString({ message: 'La biografía debe ser una cadena de texto.' })
  biography?: string

  @ApiPropertyOptional({
    description: 'Foto de perfil del usuario',
    example: 'https://example.com/newprofile.jpg'
  })
  @IsOptional()
  @IsUrl({}, { message: 'La imagen debe ser una URL válida.' })
  image?: string

  @ApiPropertyOptional({
    description: 'Género del usuario',
    example: 'Femenino'
  })
  @IsOptional()
  @IsString({ message: 'El género debe ser una cadena de texto.' })
  gender?: string

  @ApiPropertyOptional({
    description: 'Fecha de nacimiento del usuario',
    example: '1990-02-01'
  })
  @IsOptional()
  @IsDate()
  birthdate?: string

  @ApiPropertyOptional({
    description: 'Idioma preferido del usuario',
    example: 'Inglés'
  })
  @IsOptional()
  @IsString({ message: 'El idioma debe ser una cadena de texto.' })
  idiom?: string
}
