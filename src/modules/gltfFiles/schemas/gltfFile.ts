import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

import { ArticleModelEntry } from './articleModelEntry.schema'

@Schema({ timestamps: true })
export class GltfFile extends Document {
  @Prop({ type: Types.ObjectId, ref: ArticleModelEntry.name, required: true })
  @ApiProperty({
    description: 'ID del modelo de artículo',
    example: '60d2f77bcf86cd799439012'
  })
  model_id: ArticleModelEntry

  @Prop({ required: true })
  @ApiProperty({
    description: 'Ruta del archivo GLTF',
    example: '/path/to/model.gltf'
  })
  file_path: string
}

export const GltfFileSchema = SchemaFactory.createForClass(GltfFile)
