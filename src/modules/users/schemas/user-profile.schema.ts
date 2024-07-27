import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

import { User } from './user.schema'

@Schema({ timestamps: true })
export class UserProfile extends Document {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  @ApiProperty({
    description: 'ID del usuario',
    example: '607d2f77bcf86cd799439011'
  })
  user_id: User

  @Prop({ required: true })
  @ApiProperty({ description: 'Nombre del usuario', example: 'John Doe' })
  name: string

  @Prop()
  @ApiProperty({
    description: 'Biografía del usuario',
    example: 'Desarrollador de software con 10 años de experiencia.'
  })
  biography: string

  @Prop({ required: false })
  @ApiProperty({
    description: 'Foto de perfil del usuario',
    example: 'https://example.com/profile.jpg'
  })
  image?: string

  @Prop()
  @ApiProperty({
    description: 'Género del usuario',
    example: 'Masculino'
  })
  gender: string

  @Prop()
  @ApiProperty({
    description: 'Fecha de nacimiento del usuario',
    example: '1990-01-01'
  })
  birthdate: Date

  @Prop()
  @ApiProperty({
    description: 'Idioma preferido del usuario',
    example: 'Español'
  })
  idiom: string
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile)
