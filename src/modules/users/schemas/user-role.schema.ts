import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

import { User } from './user.schema'
import { Role } from './role.schema'

@Schema({ timestamps: true })
export class UserRole extends Document {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  @ApiProperty({
    description: 'ID del usuario al que se le asigna el rol',
    example: '607d2f77bcf86cd799439011'
  })
  user_id: User

  @Prop({ type: Types.ObjectId, ref: Role.name, required: true })
  @ApiProperty({
    description: 'ID del rol asignado',
    example: '60d2f77bcf86cd799439012'
  })
  role_id: Role
}

export const UserRoleSchema = SchemaFactory.createForClass(UserRole)
