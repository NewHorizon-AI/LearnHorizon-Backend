import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

import { File } from './file.schema'

@Schema()
export class ArticleModel extends Document {
  @Prop({ type: Types.ObjectId, ref: File.name, required: true })
  @ApiProperty({
    description: 'ID del artículo',
    example: '60d2f77bcf86cd799439012'
  })
  article_id: Types.ObjectId
}

export const ArticleModelSchema = SchemaFactory.createForClass(ArticleModel)
