import { ApiProperty } from '@nestjs/swagger'
import { Types } from 'mongoose'

class ArticleAuthor {
  @ApiProperty({
    description: 'ID del autor',
    example: '60d0fe4f5311236168a109ca'
  })
  _id: Types.ObjectId

  @ApiProperty({
    description: 'Imagen del autor',
    example: 'https://example.com/author.jpg'
  })
  image?: string

  @ApiProperty({ description: 'Nombre del autor', example: 'John Doe' })
  name: string

  @ApiProperty({
    description: 'Cantidad de seguidores del autor',
    example: 100
  })
  followers: number
}

class ArticleCategory {
  @ApiProperty({
    description: 'ID de la categoría',
    example: '60d0fe4f5311236168a109cc'
  })
  _id: Types.ObjectId

  @ApiProperty({ description: 'Título de la categoría', example: 'Tecnología' })
  title: string

  @ApiProperty({
    description: 'Cantidad de publicaciones en la categoría',
    example: 10
  })
  publicationCount: number
}

export class ArticlePublication {
  @ApiProperty({
    description: 'ID de la publicación',
    example: '60d0fe4f5311236168a109cd'
  })
  _id: Types.ObjectId

  @ApiProperty({
    description: 'Título de la publicación',
    example: 'Cómo usar NestJS con MongoDB'
  })
  title: string

  @ApiProperty({
    description: 'URL de la foto de la publicación',
    example: 'https://example.com/photo.jpg'
  })
  photo: string

  @ApiProperty({
    description: 'Subtítulo de la publicación',
    example: 'Una guía completa para integrar NestJS con MongoDB'
  })
  subtitle: string

  @ApiProperty({
    description: 'Descripción de la publicación',
    example:
      'Esta publicación explica cómo integrar NestJS con MongoDB paso a paso.'
  })
  description: string

  @ApiProperty({
    description: 'Contenido en formato markdown de la publicación',
    example:
      '# Introducción\nEste es el contenido en markdown de la publicación.'
  })
  markdownContent: string

  @ApiProperty({
    description: 'Etiquetas de la publicación',
    example: ['NestJS', 'MongoDB', 'Tutorial']
  })
  tags: string[]

  @ApiProperty({
    description: 'Fecha de publicación',
    example: '2024-05-20T18:25:43.511Z'
  })
  publicationDate: Date

  @ApiProperty({
    description: 'Cantidad de vistas de la publicación',
    example: 100
  })
  views: number

  @ApiProperty({
    description: 'Cantidad de likes de la publicación',
    example: 20
  })
  likes: number

  @ApiProperty({
    description: 'Cantidad de dislikes de la publicación',
    example: 2
  })
  dislikes: number

  @ApiProperty({
    description: 'Autores de la publicación',
    type: [ArticleAuthor]
  })
  author: ArticleAuthor[]

  @ApiProperty({
    description: 'Categorías de la publicación',
    type: [ArticleCategory]
  })
  category: ArticleCategory[]
}
