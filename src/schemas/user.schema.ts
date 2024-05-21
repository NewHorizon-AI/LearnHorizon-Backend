import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

@Schema()
export class User extends Document {
  @Prop({ required: false })
  @ApiProperty({
    description: 'Foto de perfil del usuario',
    example: 'https://example.com/profile.jpg'
  })
  image?: string

  @Prop({ required: true })
  @ApiProperty({ description: 'Nombre del usuario', example: 'John Doe' })
  name: string

  @Prop({ required: true, unique: true })
  @ApiProperty({ description: 'Nombre único de usuario', example: 'john_doe' })
  username: string

  @Prop({ required: true })
  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'securepassword123'
  })
  password: string

  @Prop({ default: 0 })
  @ApiProperty({
    description: 'Cantidad de seguidores del usuario',
    example: 100,
    default: 0
  })
  followers: number

  @Prop({ default: false })
  @ApiProperty({
    description: 'Permisos de edición del usuario',
    example: false,
    default: false
  })
  editPermissions: boolean

  @Prop()
  @ApiProperty({
    description: 'Biografía del usuario',
    example: 'Desarrollador de software con 10 años de experiencia.'
  })
  biography: string

  @Prop({ type: Date, default: Date.now })
  @ApiProperty({
    description: 'Fecha de creación del usuario',
    example: '2024-05-20T18:25:43.511Z',
    default: new Date()
  })
  creationDate: Date

  @Prop({ required: true, unique: true })
  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'john.doe@example.com'
  })
  email: string
}

export const UserSchema = SchemaFactory.createForClass(User)
