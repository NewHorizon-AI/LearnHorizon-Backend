import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

// import { ArticleModelEntry } from 'src/modules/article-entry/schemas/article-model-entry.schema'

@Schema()
export class UploadGltf extends Document {
  // @Prop({ type: Types.ObjectId, ref: ArticleModelEntry.name, required: true })
  // @ApiProperty({
  //   description: 'ID del artículo',
  //   example: '60d2f77bcf86cd799439012'
  // })
  // article_entry_id: Types.ObjectId

  @ApiProperty({
    description: 'Nombre del archivo',
    example: 'model.gltf'
  })
  @Prop({ required: true })
  filename: string

  @ApiProperty({
    description: 'Ruta del archivo en el servidor',
    example: 'uploads/model.gltf'
  })
  @Prop({ required: true })
  path: string

  @ApiProperty({
    description: 'Tipo MIME del archivo',
    example: 'model/gltf+json'
  })
  @Prop({ required: true })
  mimetype: string

  @ApiProperty({
    description: 'Fecha y hora en que se subió el archivo',
    example: '2024-07-31T00:00:00.000Z'
  })
  @Prop({ default: Date.now })
  uploadedAt: Date
}

export const UploadGltfSchema = SchemaFactory.createForClass(UploadGltf)
