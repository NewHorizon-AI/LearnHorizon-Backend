import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

// * Importacion de los esquemas necesarios
import { Article } from 'src/modules/articles/schemas/article.schema'

@Schema({ timestamps: true })
export class ArticleModel extends Document {
  @Prop({ type: Types.ObjectId, ref: Article.name, required: true })
  @ApiProperty({
    description: 'ID del artículo',
    example: '60d2f77bcf86cd799439012'
  })
  article_id: Article
}

export const ArticleModelSchema = SchemaFactory.createForClass(ArticleModel)
