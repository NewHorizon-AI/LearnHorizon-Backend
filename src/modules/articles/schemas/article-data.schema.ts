import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

import { Article } from './article.schema'
// import { ArticleTag } from './article-tag.schema'

@Schema({ timestamps: true })
export class ArticleData extends Document {
  @Prop({ type: Types.ObjectId, ref: Article.name, required: true })
  @ApiProperty({
    description: 'ID del artículo',
    example: '60d2f77bcf86cd799439012'
  })
  article_id: Article

  @Prop({ required: true })
  @ApiProperty({
    description: 'URL de la foto del artículo',
    example: 'https://example.com/photo.jpg'
  })
  photo: string

  @Prop({ required: true })
  @ApiProperty({
    description: 'Descripción del artículo',
    example: 'Este es un artículo sobre NestJS y MongoDB.'
  })
  description: string

  @Prop({ default: 0 })
  @ApiProperty({
    description: 'Número de vistas del artículo',
    example: 100
  })
  views: number

  @Prop({ default: 0 })
  @ApiProperty({
    description: 'Número de likes del artículo',
    example: 50
  })
  likes: number

  @Prop({ default: 0 })
  @ApiProperty({
    description: 'Número de dislikes del artículo',
    example: 5
  })
  dislikes: number

  // @Prop({ type: [{ type: Types.ObjectId, ref: ArticleTag.name }] })
  // @ApiProperty({
  //   description: 'Etiquetas asociadas al artículo',
  //   example: ['60d2f77bcf86cd799439013', '60d2f77bcf86cd799439014']
  // })
  // tags: ArticleTag[]
}

export const ArticleDataSchema = SchemaFactory.createForClass(ArticleData)
