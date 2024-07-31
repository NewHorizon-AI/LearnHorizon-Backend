import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

import { ArticleModelEntry } from './article-model-entry.schema'

@Schema({ timestamps: true })
export class GltfFile extends Document {
  @Prop({ type: Types.ObjectId, ref: ArticleModelEntry.name, required: true })
  @ApiProperty({
    description: 'ID del modelo de artículo',
    example: '60d2f77bcf86cd799439012'
  })
  article_id: ArticleModelEntry

  @Prop({ required: true })
  @ApiProperty({
    description: 'Ruta del archivo GLTF',
    example: '/path/to/model.gltf'
  })
  path: string

  @Prop({ required: true })
  @ApiProperty({
    description: 'Nombre original del archivo GLTF',
    example: 'model.gltf'
  })
  originalName: string

  @Prop({ required: true })
  @ApiProperty({
    description: 'Tamaño del archivo en bytes',
    example: 123456
  })
  size: number

  @Prop({ required: true })
  @ApiProperty({
    description: 'Tipo MIME del archivo',
    example: 'model/gltf+json'
  })
  mimetype: string
}

export const GltfFileSchema = SchemaFactory.createForClass(GltfFile)
