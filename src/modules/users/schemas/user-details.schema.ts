import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { GenderEnum } from '../interfaces/gender.enum'
import { LanguageEnum } from '../interfaces/language.enum'

@Schema()
export class UserDetails extends Document {
  @Prop({ required: true, minlength: 3, maxlength: 100 })
  @ApiProperty({
    description: 'Nombre completo del usuario, entre 3 y 100 caracteres',
    example: 'John Doe'
  })
  fullName: string

  @Prop({ maxlength: 500 })
  @ApiProperty({
    description: 'Breve biografía del usuario, hasta 500 caracteres',
    example: 'Desarrollador de software con 10 años de experiencia.'
  })
  bio?: string

  @Prop({ required: false })
  @ApiProperty({
    description: 'URL de la imagen de perfil del usuario',
    example: 'https://example.com/profile.jpg'
  })
  profileImage?: string

  @Prop({
    required: true,
    enum: GenderEnum
  })
  @ApiProperty({
    description: 'Identidad de género del usuario',
    example: GenderEnum.MASCULINO
  })
  genderIdentity?: GenderEnum

  @Prop({ required: true })
  @ApiProperty({
    description: 'Fecha de nacimiento del usuario',
    example: '1990-01-01'
  })
  birthDate?: Date

  @Prop({
    required: true,
    enum: LanguageEnum
  })
  @ApiProperty({
    description: 'Idioma preferido del usuario',
    example: LanguageEnum.ESPANOL
  })
  preferredLanguage?: LanguageEnum

  @Prop({ default: 0, min: 0 })
  @ApiProperty({
    description:
      'Número de artículos escritos por el usuario, valor por defecto: 0',
    example: 10
  })
  articleCount: number
}

export const UserDetailsSchema = SchemaFactory.createForClass(UserDetails)
