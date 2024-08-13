import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { File } from './file.schema'
import { Types } from 'mongoose'

// * Importacion de los esquemas necesarios
import { ArticleModel } from 'src/modules/article-model/schemas/article-model.schema'

@Schema()
export class FileGltf extends File {
  @Prop({ type: Types.ObjectId, ref: ArticleModel.name, required: true })
  @ApiProperty({
    description: 'ID del artículo',
    example: '60d2f77bcf86cd799439012'
  })
  article_model_id: Types.ObjectId
}

export const FileGltfSchema = SchemaFactory.createForClass(FileGltf)
