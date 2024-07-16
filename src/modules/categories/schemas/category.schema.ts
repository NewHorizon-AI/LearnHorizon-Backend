import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

@Schema({ timestamps: true })
export class Category extends Document {
  @Prop({ required: true })
  @ApiProperty({ description: 'Título de la categoría', example: 'Tecnología' })
  name: string
}

export const CategorySchema = SchemaFactory.createForClass(Category)
