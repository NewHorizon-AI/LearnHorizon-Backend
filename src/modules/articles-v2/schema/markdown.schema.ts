import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { Article } from './article.schema'
import { MarkdownDocs } from '../docs/swagger/schemas/markdown.docs'

@Schema()
export class Markdown extends Document {
  @Prop({ type: Types.ObjectId, ref: Article.name, required: true })
  @ApiProperty(MarkdownDocs.article_id)
  article_id: Article

  @Prop({ required: true })
  @ApiProperty(MarkdownDocs.content)
  content: string
}

export const MarkdownSchema = SchemaFactory.createForClass(Markdown)
MarkdownSchema.index({ article_id: 1 })
