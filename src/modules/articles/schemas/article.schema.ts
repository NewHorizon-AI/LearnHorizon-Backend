import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

@Schema({ timestamps: true })
export class Article extends Document {
  @Prop({ required: true })
  @ApiProperty({
    description: 'Título de la publicación',
    example: 'Cómo usar NestJS con MongoDB'
  })
  title: string

  @Prop({ required: true })
  @ApiProperty({
    description: 'Estado de la publicación',
    example: 'publicado'
  })
  status: string
}

export const ArticleSchema = SchemaFactory.createForClass(Article)
