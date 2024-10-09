import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

import { IArticleStatus } from '../interfaces/article-status.enum'

import { ArticleSwaggerDocs } from '../documentation/swagger/schemas/article.docs'

// * Importar los esquemas necesarios
import { Category } from 'src/modules/categories-v2/schemas/category.schema'
import { User } from 'src/modules/users/schemas/user.schema'

@Schema({ timestamps: true })
export class Article extends Document {
  @Prop()
  title: string

  @Prop({ type: [{ type: Types.ObjectId, ref: User.name }], required: true })
  users: Types.ObjectId[]

  @Prop({
    type: [{ type: Types.ObjectId, ref: Category.name }]
  })
  categories?: Types.ObjectId[]

  @Prop()
  photo?: string

  @Prop()
  description?: string

  @Prop({ default: 0 })
  views: number

  @Prop({ default: 0 })
  likes: number

  @Prop({ default: 0 })
  dislikes: number

  @Prop({ required: true })
  content: string

  @Prop({ default: IArticleStatus.DRAFT, enum: IArticleStatus })
  status: IArticleStatus
}

export const ArticleSchema = SchemaFactory.createForClass(Article)
