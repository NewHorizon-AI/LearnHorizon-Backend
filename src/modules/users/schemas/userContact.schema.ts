import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

import { User } from './user.schema'

@Schema()
export class UserContact extends Document {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  @ApiProperty({
    description: 'ID del usuario',
    example: '607d2f77bcf86cd799439011'
  })
  user_id: User

  @Prop({ required: false })
  @ApiProperty({
    description: 'Dirección del usuario',
    example: '123 Main St, City, Country'
  })
  address?: string

  @Prop({ required: true })
  @ApiProperty({
    description: 'Teléfono del usuario',
    example: '+123456789'
  })
  phone: string
}

export const UserContactSchema = SchemaFactory.createForClass(UserContact)
