import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

import { Category } from './category.schema'
import { Article } from 'src/modules/article/schemas/article.schema'

@Schema({ timestamps: true })
export class ArticleCategory extends Document {
  @Prop({ type: Types.ObjectId, ref: ArticleCategory.name, required: true })
  @ApiProperty({
    description: 'ID de la categoría',
    example: '607d2f77bcf86cd799439011'
  })
  category_id: Category

  @Prop({ type: Types.ObjectId, ref: Article.name, required: true })
  @ApiProperty({
    description: 'ID de la categoría',
    example: '607d2f77bcf86cd799439011'
  })
  article_id: Article
}

export const ArticleCategorySchema =
  SchemaFactory.createForClass(ArticleCategory)
