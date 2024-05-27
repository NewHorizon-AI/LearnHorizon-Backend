import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { User } from 'src/modules/users/schemas/user.schema'
import { Publication } from 'src/modules/publications/schemas/publication.schema'
import { ApiProperty } from '@nestjs/swagger'

@Schema()
export class Comment extends Document {
  // Propiedad de tipo referencia que almacena el usuario que realizó el comentario
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  @ApiProperty({
    description: 'ID del usuario que realizó el comentario',
    type: String,
    example: '60d0fe4f5311236168a109ca'
  })
  user: User

  // Propiedad de tipo cadena que almacena el comentario
  @Prop({ required: true })
  @ApiProperty({
    description: 'Contenido del comentario',
    example: 'Este es un comentario de ejemplo.'
  })
  comment: string

  // Propiedad de tipo número que almacena la cantidad de likes del comentario
  @Prop({ default: 0 })
  @ApiProperty({
    description: 'Cantidad de likes del comentario',
    example: 10,
    default: 0
  })
  likes: number

  // Propiedad de tipo número que almacena la cantidad de dislikes del comentario
  @Prop({ default: 0 })
  @ApiProperty({
    description: 'Cantidad de dislikes del comentario',
    example: 2,
    default: 0
  })
  dislikes: number

  // Propiedad de tipo fecha que almacena la fecha de creación del comentario
  @Prop({ type: Date, default: Date.now })
  @ApiProperty({
    description: 'Fecha de creación del comentario',
    example: '2024-05-20T18:25:43.511Z'
  })
  commentDate: Date

  // Propiedad de tipo arreglo que almacena las respuestas del comentario
  @Prop([{ type: Types.ObjectId, ref: 'Comment' }])
  @ApiProperty({
    description: 'IDs de las respuestas al comentario',
    type: [String],
    example: ['60d0fe4f5311236168a109cb', '60d0fe4f5311236168a109cc']
  })
  replies: Comment[]

  // Propiedad de tipo referencia que almacena la publicación a la que pertenece el comentario
  @Prop({ type: Types.ObjectId, ref: 'Publication' })
  @ApiProperty({
    description: 'ID de la publicación a la que pertenece el comentario',
    type: String,
    example: '60d0fe4f5311236168a109cd'
  })
  publication: Publication

  // Propiedad de tipo booleano que almacena si el comentario ha sido editado
  @Prop({ default: false })
  @ApiProperty({
    description: 'Indica si el comentario ha sido editado',
    example: false,
    default: false
  })
  edited: boolean
}

export const CommentSchema = SchemaFactory.createForClass(Comment)
