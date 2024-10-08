import { ApiProperty } from '@nestjs/swagger'
import { GenderEnum } from '../interfaces/gender.enum'
import { LanguageEnum } from '../interfaces/language.enum'

export class CreateUserDetailsDto {
  @ApiProperty({
    description: 'Nombre completo del usuario, entre 3 y 100 caracteres',
    example: 'John Doe'
  })
  fullName: string

  @ApiProperty({
    description: 'Breve biografía del usuario, hasta 500 caracteres',
    example: 'Desarrollador de software con 10 años de experiencia.'
  })
  bio?: string

  @ApiProperty({
    description: 'URL de la imagen de perfil del usuario',
    example: 'https://example.com/profile.jpg'
  })
  profileImage?: string

  @ApiProperty({
    description: 'Identidad de género del usuario',
    enum: GenderEnum
  })
  genderIdentity: GenderEnum

  @ApiProperty({
    description: 'Fecha de nacimiento del usuario',
    example: '1990-01-01'
  })
  birthDate: Date

  @ApiProperty({
    description: 'Idioma preferido del usuario',
    enum: LanguageEnum
  })
  preferredLanguage: LanguageEnum

  @ApiProperty({
    description:
      'Número de artículos escritos por el usuario, valor por defecto: 0',
    example: 10
  })
  articleCount?: number
}
