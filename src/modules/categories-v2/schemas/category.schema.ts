import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { CategorySwaggerDocs } from '../documentation/category.swagger'

@Schema({ timestamps: true })
export class Category extends Document implements CategorySwaggerDocs {
  @Prop({ required: true, trim: true, maxlength: 100 })
  name: string

  @Prop({ default: 0, min: 0 })
  numberOfArticles: number
}

export const CategorySchema = SchemaFactory.createForClass(Category)

// * Índice en ´name´ para mejorar las búsquedas por nombre de la categoría
CategorySchema.index({ name: 1 })
