import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { Article } from './article.schema'
import { ArticleMarkdownDocs } from '../docs/swagger/article/article-markdown.docs'

@Schema()
export class ArticleMarkdown extends Document {
  @Prop({ type: Types.ObjectId, ref: Article.name, required: true })
  @ApiProperty(ArticleMarkdownDocs.article_id)
  article_id: Article

  @Prop({ required: true })
  @ApiProperty(ArticleMarkdownDocs.content)
  content: string
}

export const ArticleMarkdownSchema =
  SchemaFactory.createForClass(ArticleMarkdown)
