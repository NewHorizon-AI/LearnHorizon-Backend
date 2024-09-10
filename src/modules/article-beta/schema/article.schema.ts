import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

import { User } from 'src/modules/users/schemas/user.schema'
import { ArticleStatus } from '../interfaces/article-status.enum'

import { ArticleDocs } from '../docs/swagger/article/article-docs'

@Schema({ timestamps: true })
export class Article extends Document {
  @Prop({ default: 'Nuevo artículo' })
  @ApiProperty(ArticleDocs.title)
  title: string

  @Prop({ type: [{ type: Types.ObjectId, ref: User.name }], required: true })
  @ApiProperty(ArticleDocs.users)
  users: User[]

  @Prop({ default: ArticleStatus.DRAFT, enum: ArticleStatus })
  @ApiProperty(ArticleDocs.status)
  status: ArticleStatus
}

export const ArticleSchema = SchemaFactory.createForClass(Article)
