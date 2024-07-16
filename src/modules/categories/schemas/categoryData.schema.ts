import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

import { Category } from './category.schema'

@Schema({ timestamps: true })
export class CategoryData extends Document {
  @Prop({ type: Types.ObjectId, ref: Category.name, required: true })
  @ApiProperty({
    description: 'ID de la categoría',
    example: '607d2f77bcf86cd799439011'
  })
  category_id: Category

  @Prop({ required: true })
  @ApiProperty({
    description: 'Descripción de la categoría',
    example: 'Categoría relacionada con tecnología y gadgets.'
  })
  description: string

  @Prop({ default: 0 })
  @ApiProperty({
    description: 'Cantidad de articulos en la categoría',
    example: 10
  })
  articles_count: number
}

export const CategoryDataSchema = SchemaFactory.createForClass(CategoryData)
