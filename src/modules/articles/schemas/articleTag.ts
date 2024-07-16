import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

import { ArticleData } from './articleData.schema'

@Schema()
export class ArticleTag extends Document {
  @Prop({ type: Types.ObjectId, ref: ArticleData.name, required: true })
  @ApiProperty({
    description: 'ID del artículo',
    example: '60d2f77bcf86cd799439012'
  })
  article_id: Types.ObjectId

  @Prop({ required: true })
  @ApiProperty({
    description: 'Etiqueta asociada al artículo',
    example: 'NestJS'
  })
  tag: string

  @Prop({ required: true })
  @ApiProperty({
    description: 'Descripción de la etiqueta',
    example: 'Esta etiqueta está relacionada con artículos sobre NestJS.'
  })
  description: string
}

export const ArticleTagSchema = SchemaFactory.createForClass(ArticleTag)
