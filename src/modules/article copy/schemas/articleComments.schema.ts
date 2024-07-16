import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

import { User } from 'src/modules/users/schemas/user.schema'
import { Article } from 'src/modules/article/schemas/article.schema'

@Schema({ timestamps: true })
export class ArticleComment extends Document {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  @ApiProperty({
    description: 'ID del usuario',
    example: '607d2f77bcf86cd799439011'
  })
  user_id: User

  @Prop({ type: Types.ObjectId, ref: Article.name, required: true })
  @ApiProperty({
    description: 'ID del artículo',
    example: '60d2f77bcf86cd799439012'
  })
  article_id: Article

  @Prop({ required: true })
  @ApiProperty({
    description: 'Contenido del comentario',
    example: 'Este es un comentario sobre el artículo.'
  })
  content: string
}

export const ArticleCommentSchema = SchemaFactory.createForClass(ArticleComment)
