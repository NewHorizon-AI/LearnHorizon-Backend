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

  //   @Prop()
  //   icon: string
}

export const CategorySchema = SchemaFactory.createForClass(Category)
