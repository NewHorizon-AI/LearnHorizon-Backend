import { ApiProperty } from '@nestjs/swagger'
import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsDate
} from 'class-validator'

export class CreateUserProfileDto {
  @ApiProperty({
    description: 'ID del usuario',
    example: '607d2f77bcf86cd799439011'
  })
  @IsMongoId({ message: 'El ID del usuario debe ser un ID válido de MongoDB.' })
  user_id: string

  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'John Doe'
  })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  name: string

  @ApiProperty({
    description: 'Biografía del usuario',
    example: 'Desarrollador de software con 10 años de experiencia.'
  })
  @IsOptional()
  @IsString({ message: 'La biografía debe ser una cadena de texto.' })
  biography?: string

  @ApiProperty({
    description: 'Foto de perfil del usuario',
    example: 'https://example.com/profile.jpg'
  })
  @IsOptional()
  @IsUrl({}, { message: 'La imagen debe ser una URL válida.' })
  image?: string

  @ApiProperty({
    description: 'Género del usuario',
    example: 'Masculino'
  })
  @IsNotEmpty({ message: 'El género es obligatorio.' })
  @IsString({ message: 'El género debe ser una cadena de texto.' })
  gender: string

  @ApiProperty({
    description: 'Fecha de nacimiento del usuario',
    example: '1990-01-01'
  })
  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria.' })
  @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida.' })
  birthdate: string

  @ApiProperty({
    description: 'Idioma preferido del usuario',
    example: 'Español'
  })
  @IsNotEmpty({ message: 'El idioma es obligatorio.' })
  @IsString({ message: 'El idioma debe ser una cadena de texto.' })
  idiom: string
}
