import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

import { ArticleModel } from './article-model.schema'

@Schema()
export class ArticleModelTransformation extends Document {
  @Prop({ type: Types.ObjectId, ref: ArticleModel.name, required: true })
  @ApiProperty({
    description: 'ID del la entrada del modelo de artículo',
    example: '60d2f77bcf86cd799439012'
  })
  article_model_id: Types.ObjectId

  @Prop({ required: true, type: [Number], default: [1, 1, 1] })
  @ApiProperty({
    description: 'Escala del modelo',
    example: [1, 1, 1]
  })
  scale: number[]

  @Prop({ required: true, type: [Number], default: [0, 0, 0] })
  @ApiProperty({
    description: 'Rotación del modelo',
    example: [0, 0, 0]
  })
  rotation: number[]

  @Prop({ required: true, type: [Number], default: [0, 0, 0] })
  @ApiProperty({
    description: 'Posición del modelo',
    example: [0, 0, 0]
  })
  position: number[]
}

export const ArticleModelTransformationSchema = SchemaFactory.createForClass(
  ArticleModelTransformation
)
