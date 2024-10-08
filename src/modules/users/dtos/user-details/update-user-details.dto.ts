import { ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsString,
  IsOptional,
  IsUrl,
  IsEnum,
  IsISO8601,
  Length,
  MaxLength,
  Matches
} from 'class-validator'
import { GenderEnum } from '../../interfaces/gender.enum'
import { LanguageEnum } from '../../interfaces/language.enum'

export class UpdateUserDetailsDto {
  @ApiPropertyOptional({
    description:
      'Nombre completo del usuario, entre 3 y 100 caracteres alfabéticos. Puede incluir espacios, pero no caracteres especiales o números.',
    example: 'John Doe',
    minLength: 3,
    maxLength: 100
  })
  @IsOptional()
  @IsString({
    message: 'El nombre completo debe ser una cadena de texto válida.'
  })
  @Length(3, 100, {
    message: 'El nombre completo debe tener entre 3 y 100 caracteres.'
  })
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'El nombre completo solo puede contener letras y espacios.'
  })
  fullName?: string

  @ApiPropertyOptional({
    description: 'Breve biografía del usuario, hasta 500 caracteres.',
    example: 'Desarrollador de software con 10 años de experiencia.',
    maxLength: 500
  })
  @IsOptional()
  @IsString({ message: 'La biografía debe ser una cadena de texto válida.' })
  @MaxLength(500, {
    message: 'La biografía no puede exceder los 500 caracteres.'
  })
  bio?: string

  @ApiPropertyOptional({
    description:
      'URL de la imagen de perfil del usuario. Debe ser una URL válida.',
    example: 'https://example.com/profile.jpg'
  })
  @IsOptional()
  @IsUrl({}, { message: 'La URL de la imagen de perfil debe ser válida.' })
  profileImage?: string

  @ApiPropertyOptional({
    description:
      'Identidad de género del usuario, debe ser uno de los valores definidos en el enumerador GenderEnum.',
    enum: GenderEnum,
    example: GenderEnum.MASCULINO
  })
  @IsOptional()
  @IsEnum(GenderEnum, {
    message:
      'La identidad de género debe ser un valor válido del enumerador GenderEnum.'
  })
  genderIdentity?: GenderEnum

  @ApiPropertyOptional({
    description:
      'Fecha de nacimiento del usuario en formato ISO 8601 (YYYY-MM-DD).',
    example: '1990-01-01'
  })
  @IsOptional()
  @IsISO8601(
    { strict: true },
    {
      message:
        'La fecha de nacimiento debe estar en el formato ISO 8601 (YYYY-MM-DD).'
    }
  )
  birthDate?: Date

  @ApiPropertyOptional({
    description:
      'Idioma preferido del usuario, debe ser uno de los valores definidos en el enumerador LanguageEnum.',
    enum: LanguageEnum,
    example: LanguageEnum.ESPANOL
  })
  @IsOptional()
  @IsEnum(LanguageEnum, {
    message:
      'El idioma preferido debe ser un valor válido del enumerador LanguageEnum.'
  })
  preferredLanguage?: LanguageEnum
}
