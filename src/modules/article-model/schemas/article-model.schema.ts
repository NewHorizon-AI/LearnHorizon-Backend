import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

// * Importacion de los esquemas necesarios
import { Article } from 'src/modules/articles/schemas/article.schema'
import { ArticleModelTransformation } from './article-model-transformation.schema'

@Schema({ timestamps: true })
export class ArticleModel extends Document {
  @Prop({ type: Types.ObjectId, ref: Article.name, required: true })
  @ApiProperty({
    description: 'ID del artículo',
    example: '60d2f77bcf86cd799439012'
  })
  article_id: Types.ObjectId

  @Prop({
    type: Types.ObjectId,
    ref: ArticleModelTransformation.name
  })
  @ApiProperty({
    description: 'Transformación del modelo',
    example: '60d2f77bcf86cd799439012'
  })
  transformation_id?: Types.ObjectId
}

export const ArticleModelSchema = SchemaFactory.createForClass(ArticleModel)
