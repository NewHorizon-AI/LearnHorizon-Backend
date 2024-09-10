import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { Article } from './article.schema'

import { ArticleDataDocs } from '../docs/swagger/article/article-data.docs'

@Schema({ timestamps: true })
export class ArticleData extends Document {
  @Prop({ type: Types.ObjectId, ref: Article.name, required: true })
  @ApiProperty(ArticleDataDocs.article_id)
  article_id: Article

  @Prop({ required: true })
  @ApiProperty(ArticleDataDocs.photo)
  photo: string

  @Prop({ required: true })
  @ApiProperty(ArticleDataDocs.description)
  description: string

  @Prop({ default: 0 })
  @ApiProperty(ArticleDataDocs.views)
  views: number

  @Prop({ default: 0 })
  @ApiProperty(ArticleDataDocs.likes)
  likes: number

  @Prop({ default: 0 })
  @ApiProperty(ArticleDataDocs.dislikes)
  dislikes: number

  // @Prop({ type: [{ type: Types.ObjectId, ref: ArticleTag.name }] })
  // @ApiProperty(ArticleDataDocs.tags)
  // tags: ArticleTag[];
}

export const ArticleDataSchema = SchemaFactory.createForClass(ArticleData)
