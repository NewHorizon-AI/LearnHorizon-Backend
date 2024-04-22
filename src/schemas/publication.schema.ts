import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { User } from './user.schema'
import { Category } from './category.schema'
import { Comment } from './comment.schema'

@Schema()
export class Publication extends Document {
  // Propiedad de tipo cadena que almacena el título del publication
  @Prop({ required: true })
  title: string

  // Propiedad de tipo cadena que almacena la foto del publication
  @Prop({ required: true })
  photo: string

  // Propiedad de tipo cadena que almacena el subtítulo del publication
  @Prop({ required: true })
  subtitle: string

  // Propiedad de tipo cadena que almacena la descripción del publication
  @Prop({ required: true })
  description: string

  // Propiedad de tipo cadena que almacena el contenido en formato markdown del publication
  @Prop({ required: true })
  markdownContent: string

  // Propiedad de tipo arreglo que almacena las etiquetas del publication
  @Prop([String])
  tags: string[]

  // Propiedad de tipo fecha que almacena la fecha de publicación del publication
  @Prop({ type: Date, default: Date.now })
  publicationDate: Date

  // Propiedad de tipo número que almacena la cantidad de likes del publication
  @Prop({ default: 0 })
  views: number

  // Propiedad de tipo número que almacena la cantidad de likes del publication
  @Prop({ default: 0 })
  likes: number

  // Propiedad de tipo número que almacena la cantidad de dislikes del publication
  @Prop({ default: 0 })
  dislikes: number

  // Propiedad de tipo referencia que almacena el autor del publication
  @Prop({ type: Types.ObjectId, ref: 'User' })
  author: User[]

  // Propiedad de tipo referencia que almacena la categoría del publication
  @Prop({ type: Types.ObjectId, ref: 'Category' })
  category: Category[]

  // Propiedad de tipo enumeración que representa el estado del publication
  @Prop({ enum: ['published', 'review', 'draft'], default: 'draft' })
  status: string

  // Propiedad de tipo arreglo que contiene los comentarios del publication
  @Prop([{ type: Types.ObjectId, ref: 'Comment' }])
  comments: Comment[]
}

export const PublicationSchema = SchemaFactory.createForClass(Publication)
