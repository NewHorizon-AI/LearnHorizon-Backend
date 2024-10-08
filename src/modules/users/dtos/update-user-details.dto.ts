import {  ApiPropertyOptional } from '@nestjs/swagger'
import { GenderEnum } from '../interfaces/gender.enum'
import { LanguageEnum } from '../interfaces/language.enum'

export class UpdateUserDetailsDto {
  @ApiPropertyOptional({
    description: 'Nombre completo del usuario, entre 3 y 100 caracteres',
    example: 'John Doe',
    minLength: 3,
    maxLength: 100
  })
  fullName?: string

  @ApiPropertyOptional({
    description: 'Breve biografía del usuario, hasta 500 caracteres',
    example: 'Desarrollador de software con 10 años de experiencia.',
    maxLength: 500
  })
  bio?: string

  @ApiPropertyOptional({
    description: 'URL de la imagen de perfil del usuario',
    example: 'https://example.com/profile.jpg'
  })
  profileImage?: string

  @ApiPropertyOptional({
    description: 'Identidad de género del usuario',
    enum: GenderEnum,
    example: GenderEnum.MASCULINO
  })
  genderIdentity?: GenderEnum

  @ApiPropertyOptional({
    description: 'Fecha de nacimiento del usuario',
    example: '1990-01-01'
  })
  birthDate?: Date

  @ApiPropertyOptional({
    description: 'Idioma preferido del usuario',
    enum: LanguageEnum,
    example: LanguageEnum.ESPANOL
  })
  preferredLanguage?: LanguageEnum

  @ApiPropertyOptional({
    description:
      'Número de artículos escritos por el usuario, valor por defecto: 0',
    example: 10,
    minimum: 0,
    default: 0
  })
  articleCount?: number
}
