import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

import { ArticleStatus } from '../interfaces/article-status.enum'

// * (1) Importar los Esquemas necesarios
import { User } from 'src/modules/users/schemas/user.schema'

@Schema({ timestamps: true })
export class Article extends Document {
  @Prop({ default: 'Nuevo artículo' })
  @ApiProperty({
    description: 'Título de la publicación',
    example: 'Cómo usar NestJS con MongoDB',
    default: 'Nuevo artículo'
  })
  title: string

  @Prop({ type: [{ type: Types.ObjectId, ref: User.name }], required: true })
  @ApiProperty({
    description: 'Autores de la publicación',
    example: '[UserObjectId1, UserObjectId2]'
  })
  users: User[]

  @Prop({ default: ArticleStatus.DRAFT, enum: ArticleStatus })
  @ApiProperty({
    description: 'Estado de la publicación',
    example: ArticleStatus.PUBLISHED,
    default: ArticleStatus.DRAFT
  })
  status: ArticleStatus
}

export const ArticleSchema = SchemaFactory.createForClass(Article)
