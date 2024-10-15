import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

import { IArticleStatus } from '../interfaces/article-status.enum'

import { ArticleSwaggerDocs } from '../documentation/swagger/schemas/article.docs'

// * Importar los esquemas necesarios
import { Category } from 'src/modules/categories-v2/schemas/category.schema'
import { User } from 'src/modules/users/schemas/user.schema'
import { GltfModelAsset } from 'src/modules/digital-asset/schemas/gltf-model-asset.schema'

@Schema({ timestamps: true })
export class Article extends Document {
  @Prop({ default: 'Nuevo artículo' })
  title?: string

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
  views?: number

  @Prop({ default: 0 })
  likes?: number

  @Prop({ default: 0 })
  dislikes?: number

  @Prop()
  content?: string

  @Prop({ default: IArticleStatus.DRAFT, enum: IArticleStatus })
  status?: IArticleStatus

  @Prop({ type: [{ type: Types.ObjectId, ref: GltfModelAsset.name }] })
  models?: Types.ObjectId[]
}

export const ArticleSchema = SchemaFactory.createForClass(Article)
