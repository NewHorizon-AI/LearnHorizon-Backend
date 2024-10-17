import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { UserDetails } from './user-details.schema'
import { RoleEnum } from '../interfaces/role.enum'

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true, minlength: 3, maxlength: 30 })
  @ApiProperty({
    description: 'Nombre único de usuario, entre 3 y 30 caracteres',
    example: 'kevin_diaz'
  })
  username: string

  @Prop({
    required: true,
    unique: true
  })
  @ApiProperty({
    description: 'Correo electrónico del usuario, debe tener un formato válido',
    example: 'kevin.diaz@alumnos.uv.cl'
  })
  email: string

  @Prop({ required: true, minlength: 8 })
  @ApiProperty({
    description: 'Contraseña del usuario, al menos 8 caracteres',
    example: 'Ex@mplePassw0rd2024!'
  })
  password: string

  @Prop()
  @ApiProperty({
    description: 'Fecha del último inicio de sesión',
    example: '2024-07-15T08:00:00.000Z'
  })
  lastLogin?: Date

  @Prop({ type: Types.ObjectId, ref: UserDetails.name })
  @ApiProperty({
    description: 'Perfil detallado del usuario',
    type: UserDetails
  })
  details?: Types.ObjectId

  @Prop({ default: RoleEnum.EXTERNAL, enum: RoleEnum })
  @ApiProperty({
    description: 'Rol del usuario dentro del sistema',
    type: RoleEnum
  })
  role?: RoleEnum
}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.index({ username: 1 }, { unique: true })
UserSchema.index({ email: 1 }, { unique: true })
