import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

// Importación de los esquemas necesarios
import { User } from '../../users/schemas/user.schema'
import { Category } from '../../categories/schemas/category.schema'
import { Comment } from 'src/modules/comments/schemas/comment.schema'
import { Object3D } from 'src/modules/objects3d/schemas/object3d.schema'

@Schema()
export class Publication extends Document {
  // Propiedad de tipo cadena que almacena el título del publication
  @Prop({ required: true })
  @ApiProperty({
    description: 'Título de la publicación',
    example: 'Cómo usar NestJS con MongoDB'
  })
  title: string

  // Propiedad de tipo cadena que almacena la foto del publication
  @Prop({ required: true })
  @ApiProperty({
    description: 'URL de la foto de la publicación',
    example: 'https://example.com/photo.jpg'
  })
  photo: string

  // Propiedad de tipo cadena que almacena el subtítulo del publication
  @Prop({ required: true })
  @ApiProperty({
    description: 'Subtítulo de la publicación',
    example: 'Una guía completa para integrar NestJS con MongoDB'
  })
  subtitle: string

  // Propiedad de tipo cadena que almacena la descripción del publication
  @Prop({ required: true })
  @ApiProperty({
    description: 'Descripción de la publicación',
    example:
      'Esta publicación explica cómo integrar NestJS con MongoDB paso a paso.'
  })
  description: string

  // Propiedad de tipo cadena que almacena el contenido en formato markdown del publication
  @Prop({ required: true })
  @ApiProperty({
    description: 'Contenido en formato markdown de la publicación',
    example:
      '# Introducción\nEste es el contenido en markdown de la publicación.'
  })
  markdownContent: string

  // Propiedad de tipo arreglo que almacena las etiquetas del publication
  @Prop([String])
  @ApiProperty({
    description: 'Etiquetas de la publicación',
    example: ['NestJS', 'MongoDB', 'Tutorial']
  })
  tags: string[]

  // Propiedad de tipo fecha que almacena la fecha de publicación del publication
  @Prop({ type: Date, default: Date.now })
  @ApiProperty({
    description: 'Fecha de publicación',
    example: '2024-05-20T18:25:43.511Z'
  })
  publicationDate: Date

  // Propiedad de tipo número que almacena la cantidad de vistas del publication
  @Prop({ default: 0 })
  @ApiProperty({
    description: 'Cantidad de vistas de la publicación',
    example: 100,
    default: 0
  })
  views: number

  // Propiedad de tipo número que almacena la cantidad de likes del publication
  @Prop({ default: 0 })
  @ApiProperty({
    description: 'Cantidad de likes de la publicación',
    example: 20,
    default: 0
  })
  likes: number

  // Propiedad de tipo número que almacena la cantidad de dislikes del publication
  @Prop({ default: 0 })
  @ApiProperty({
    description: 'Cantidad de dislikes de la publicación',
    example: 2,
    default: 0
  })
  dislikes: number

  // Propiedad de tipo referencia que almacena el autor del publication
  @Prop([{ type: Types.ObjectId, ref: 'User', required: true }])
  @ApiProperty({
    description: 'ID del autor de la publicación',
    type: String,
    example: '60d0fe4f5311236168a109ca'
  })
  author: User[]

  // Propiedad de tipo referencia que almacena la categoría del publication
  @Prop([{ type: Types.ObjectId, ref: 'Category', required: true }])
  @ApiProperty({
    description: 'ID de la categoría de la publicación',
    type: String,
    example: '60d0fe4f5311236168a109cb'
  })
  category: Category[]

  // Propiedad de tipo enumeración que representa el estado del publication
  @Prop({ enum: ['published', 'review', 'draft'], default: 'draft' })
  @ApiProperty({
    description: 'Estado de la publicación',
    example: 'draft'
  })
  status: string

  // Propiedad de tipo arreglo que contiene los comentarios del publication
  @Prop([{ type: Types.ObjectId, ref: 'Comment' }])
  @ApiProperty({
    description: 'IDs de los comentarios de la publicación',
    type: [String],
    example: ['60d0fe4f5311236168a109cc', '60d0fe4f5311236168a109cd']
  })
  comments: Comment[]

  // Propiedad de tipo referencia que almacena el modelo 3D asociado a la publicación
  @Prop({ type: Types.ObjectId, ref: 'Object3D', required: false })
  @ApiProperty({
    description: 'ID del modelo 3D asociado',
    type: String,
    example: '60d0fe4f5311236168a109de'
  })
  model3D: Object3D
}

export const PublicationSchema = SchemaFactory.createForClass(Publication)
