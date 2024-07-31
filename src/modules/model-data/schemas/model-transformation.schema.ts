import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

import { ArticleModelEntry } from './article-model-entry.schema'
@Schema()
export class ModelTransformation extends Document {
  @Prop({ type: Types.ObjectId, ref: ArticleModelEntry.name, required: true })
  @ApiProperty({
    description: 'ID del la entrada del modelo de artículo',
    example: '60d2f77bcf86cd799439012'
  })
  article_model_id: ArticleModelEntry

  @Prop({ required: true, type: [Number] })
  @ApiProperty({
    description: 'Escala del modelo',
    example: [1, 1, 1]
  })
  scale: number[]

  @Prop({ required: true, type: [Number] })
  @ApiProperty({
    description: 'Rotación del modelo',
    example: [0, 0, 0]
  })
  rotation: number[]

  @Prop({ required: true, type: [Number] })
  @ApiProperty({
    description: 'Posición del modelo',
    example: [0, 0, 0]
  })
  position: number[]
}

export const ModelTransformationSchema =
  SchemaFactory.createForClass(ModelTransformation)
