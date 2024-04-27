import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { User } from './user.schema'
import { Publication } from './publication.schema'

@Schema()
export class Comment extends Document {
  // Propiedad de tipo referencia que almacena el usuario que realizó el comentario
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User

  // Propiedad de tipo cadena que almacena el comentario
  @Prop({ required: true })
  comment: string

  // Propiedad de tipo número que almacena la cantidad de likes del comentario
  @Prop({ default: 0 })
  likes: number

  // Propiedad de tipo número que almacena la cantidad de dislikes del comentario
  @Prop({ default: 0 })
  dislikes: number

  // Propiedad de tipo fecha que almacena la fecha de creación del comentario
  @Prop({ type: Date, default: Date.now })
  commentDate: Date

  // Propiedad de tipo arreglo que almacena las respuestas del comentario
  @Prop([{ type: Types.ObjectId, ref: 'Comment' }])
  replies: Comment[]

  // Propiedad de tipo referencia que almacena el publication al que pertenece el comentario
  @Prop({ type: Types.ObjectId, ref: 'Publication' })
  publication: Publication

  // Propiedad de tipo booleano que almacena si el comentario ha sido editado
  @Prop({ default: false })
  edited: boolean
}

export const CommentSchema = SchemaFactory.createForClass(Comment)
