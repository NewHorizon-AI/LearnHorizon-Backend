import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { User } from './user.schema'
import { Category } from './category.schema'
import { Comment } from './comment.schema'

@Schema()
export class Post extends Document {
  // Propiedad de tipo cadena que almacena el título del post
  @Prop({ required: true })
  title: string

  // Propiedad de tipo cadena que almacena la foto del post
  @Prop({ required: true })
  photo: string

  // Propiedad de tipo cadena que almacena el subtítulo del post
  @Prop({ required: true })
  subtitle: string

  // Propiedad de tipo cadena que almacena la descripción del post
  @Prop({ required: true })
  description: string

  // Propiedad de tipo cadena que almacena el contenido en formato markdown del post
  @Prop({ required: true })
  markdownContent: string

  // Propiedad de tipo arreglo que almacena las etiquetas del post
  @Prop([String])
  tags: string[]

  // Propiedad de tipo fecha que almacena la fecha de publicación del post
  @Prop({ type: Date, default: Date.now })
  publicationDate: Date

  // Propiedad de tipo número que almacena la cantidad de likes del post
  @Prop({ default: 0 })
  views: number

  // Propiedad de tipo número que almacena la cantidad de likes del post
  @Prop({ default: 0 })
  likes: number

  // Propiedad de tipo número que almacena la cantidad de dislikes del post
  @Prop({ default: 0 })
  dislikes: number

  // Propiedad de tipo referencia que almacena el autor del post
  @Prop({ type: Types.ObjectId, ref: 'User' })
  author: User

  // Propiedad de tipo referencia que almacena la categoría del post
  @Prop({ type: Types.ObjectId, ref: 'Category' })
  category: Category

  // Propiedad de tipo enumeración que representa el estado del post
  @Prop({ enum: ['published', 'review', 'draft'], default: 'draft' })
  status: string

  // Propiedad de tipo arreglo que contiene los comentarios del post
  @Prop([{ type: Types.ObjectId, ref: 'Comment' }])
  comments: Comment[]
}

export const PostSchema = SchemaFactory.createForClass(Post)
