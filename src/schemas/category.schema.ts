import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

@Schema()
export class Category extends Document {
  @Prop({ required: true })
  @ApiProperty({ description: 'Título de la categoría', example: 'Tecnología' })
  title: string

  @Prop({ required: true })
  @ApiProperty({
    description: 'Descripción de la categoría',
    example: 'Categoría relacionada con tecnología y gadgets.'
  })
  description: string

  @Prop({ default: 0 })
  @ApiProperty({
    description: 'Cantidad de publicaciones en la categoría',
    example: 10,
    default: 0
  })
  publicationCount: number

  // Si quieres incluir la propiedad `icon`, descomenta el siguiente bloque:
  // @Prop()
  // @ApiProperty({ description: 'Ícono de la categoría', example: 'fa fa-tech' })
  // icon: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category)
