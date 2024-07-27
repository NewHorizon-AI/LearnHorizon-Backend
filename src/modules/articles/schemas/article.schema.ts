import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { User } from 'src/modules/users/schemas/user.schema'

@Schema({ timestamps: true })
export class Article extends Document {
  @Prop({ required: true })
  @ApiProperty({
    description: 'Título de la publicación',
    example: 'Cómo usar NestJS con MongoDB'
  })
  title: string

  @Prop({ type: [{ type: Types.ObjectId, ref: User.name }], required: true })
  @ApiProperty({
    description: 'Autores de la publicación',
    example: 'John Doe, Jane Doe, etc.'
  })
  users: User[]

  @Prop({ required: true })
  @ApiProperty({
    description: 'Estado de la publicación',
    example: 'publicado'
  })
  status: string
}

export const ArticleSchema = SchemaFactory.createForClass(Article)
