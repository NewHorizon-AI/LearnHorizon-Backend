import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'
@Schema()
export class ArticleModelTransformation extends Document {
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
