import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  @ApiProperty({
    description: 'Nombre único de usuario',
    example: 'Kevin Diaz'
  })
  username: string

  @Prop({ required: true, unique: true })
  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'kevin.diaz@alumnos.uv.cl'
  })
  email: string

  @Prop({ required: true })
  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'Ex@mplePassw0rd2024!'
  })
  password: string

  @Prop()
  @ApiProperty({
    description: 'Fecha del último inicio de sesión',
    example: '2024-07-15T08:00:00.000Z'
  })
  last_login: Date

  @ApiProperty({
    description: 'Fecha de creación',
    example: '2024-07-15T08:00:00.000Z'
  })
  createdAt: Date

  @ApiProperty({
    description: 'Fecha de última actualización',
    example: '2024-07-15T08:00:00.000Z'
  })
  updatedAt: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
