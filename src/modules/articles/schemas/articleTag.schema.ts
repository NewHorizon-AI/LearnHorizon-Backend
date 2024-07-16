import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

@Schema()
export class ArticleTag extends Document {
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
