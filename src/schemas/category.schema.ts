import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class Category extends Document {
  // Propiedad de tipo cadena que almacena el título de la categoría
  @Prop({ required: true })
  title: string

  // Propiedad de tipo cadena que almacena la descripción de la categoría
  @Prop({ required: true })
  description: string

  // Propiedad de tipo number que almacena la cantidad de publicaciones de la categoría
  @Prop({ default: 0 })
  publicationCount: number

  //   @Prop()
  //   icon: string
}

export const CategorySchema = SchemaFactory.createForClass(Category)
