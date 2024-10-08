import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { RoleEnum } from '../interfaces/role.enum'

@Schema()
export class UserRole extends Document {
  @Prop({
    required: true,
    enum: RoleEnum
  })
  @ApiProperty({
    description: 'Rol del usuario dentro de la entidad universitaria',
    example: RoleEnum.ADMIN
  })
  role: RoleEnum

  @Prop({
    required: false,
    maxlength: 255
  })
  @ApiProperty({
    description: 'Descripción del rol, hasta un máximo de 255 caracteres',
    example: 'Administrador con todos los permisos'
  })
  roleDescription?: string

  @Prop({
    required: true,
    default: true
  })
  @ApiProperty({
    description: 'Indica si el rol está activo',
    example: true
  })
  isActive: boolean
}

export const UserRoleSchema = SchemaFactory.createForClass(UserRole)
