import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

import { User } from './user.schema'

@Schema()
export class UserData extends Document {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  @ApiProperty({
    description: 'ID del usuario',
    example: '607d2f77bcf86cd799439011'
  })
  user_id: User

  @Prop({ default: 0 })
  @ApiProperty({
    description: 'Número de artículos escritos por el usuario',
    example: 10
  })
  articles_count: number

  @Prop({ default: 0 })
  @ApiProperty({
    description: 'Número de comentarios hechos por el usuario',
    example: 5
  })
  comments_count: number
}

export const UserDataSchema = SchemaFactory.createForClass(UserData)
