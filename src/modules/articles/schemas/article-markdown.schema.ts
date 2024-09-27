import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

import { Article } from './article.schema'

@Schema({ timestamps: true })
export class ArticleMarkdown extends Document {
  @Prop({ type: Types.ObjectId, ref: Article.name, required: true })
  @ApiProperty({
    description: 'ID del artículo',
    example: '60d2f77bcf86cd799439012'
  })
  article_id: Article

  @Prop({ required: true })
  @ApiProperty({
    description: 'Contenido en formato Markdown del artículo',
    example: '## Título del Artículo\nEste es el contenido en Markdown.'
  })
  content: string
}

export const ArticleMarkdownSchema =
  SchemaFactory.createForClass(ArticleMarkdown)
