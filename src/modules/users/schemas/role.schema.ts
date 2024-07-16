import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

@Schema({ timestamps: true })
export class Role extends Document {
  @Prop({ required: false })
  @ApiProperty({
    description: 'Nombre del rol',
    example: 'Admin'
  })
  role_name: string

  @Prop({ required: false })
  @ApiProperty({
    description: 'Descripción del rol',
    example: 'Administrador con todos los permisos'
  })
  description?: string

  @Prop({ required: true })
  @ApiProperty({
    description: 'Nivel de poder del rol',
    example: 10
  })
  power_level: number
}

export const RoleSchema = SchemaFactory.createForClass(Role)
