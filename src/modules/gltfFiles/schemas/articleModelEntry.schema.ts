import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

import { Article } from 'src/modules/article/schemas/article.schema'

@Schema({ timestamps: true })
export class ArticleModelEntry extends Document {
  @Prop({ type: Types.ObjectId, ref: Article.name, required: true })
  @ApiProperty({
    description: 'ID del artículo',
    example: '60d2f77bcf86cd799439012'
  })
  article_id: Types.ObjectId

  @Prop({ required: true })
  @ApiProperty({
    description: 'Nombre del modelo',
    example: 'Nombre del modelo del artículo'
  })
  name: string
}

export const ArticleModelEntrySchema =
  SchemaFactory.createForClass(ArticleModelEntry)
