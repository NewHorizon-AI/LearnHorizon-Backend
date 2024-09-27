import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { Article } from './article.schema'

import { DataDocs } from '../docs/swagger/schemas/data.docs'

@Schema({ timestamps: true })
export class Data extends Document {
  @Prop({ type: Types.ObjectId, ref: Article.name, required: true })
  @ApiProperty(DataDocs.article_id)
  article_id: Article

  @Prop({ required: true })
  @ApiProperty(DataDocs.photo)
  photo: string

  @Prop({ required: true })
  @ApiProperty(DataDocs.description)
  description: string

  @Prop({ default: 0 })
  @ApiProperty(DataDocs.views)
  views: number

  @Prop({ default: 0 })
  @ApiProperty(DataDocs.likes)
  likes: number

  @Prop({ default: 0 })
  @ApiProperty(DataDocs.dislikes)
  dislikes: number

  // @Prop({ type: [{ type: Types.ObjectId, ref: ArticleTag.name }] })
  // @ApiProperty(DataDocs.tags)
  // tags: ArticleTag[];
}

export const DataSchema = SchemaFactory.createForClass(Data)

DataSchema.index({ article_id: 1 })
