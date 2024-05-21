import { ApiProperty } from '@nestjs/swagger'
import { Types } from 'mongoose'

class Author {
  @ApiProperty({
    description: 'ID del autor',
    example: '60d0fe4f5311236168a109ca'
  })
  _id: Types.ObjectId

  @ApiProperty({ description: 'Nombre del autor', example: 'John Doe' })
  name: string

  @ApiProperty({
    description: 'Imagen del autor',
    example: 'https://example.com/author.jpg',
    required: false
  })
  image?: string
}

class Category {
  @ApiProperty({
    description: 'ID de la categoría',
    example: '60d0fe4f5311236168a109cb'
  })
  _id: Types.ObjectId

  @ApiProperty({ description: 'Título de la categoría', example: 'Tecnología' })
  title: string
}

export class PublicationResponse {
  @ApiProperty({
    description: 'ID del contenido',
    example: '60d0fe4f5311236168a109cc'
  })
  _id: Types.ObjectId

  @ApiProperty({
    description: 'Título del contenido',
    example: 'Cómo usar NestJS con MongoDB'
  })
  title: string

  @ApiProperty({
    description: 'URL de la foto del contenido',
    example: 'https://example.com/photo.jpg'
  })
  photo: string

  @ApiProperty({
    description: 'Descripción del contenido',
    example:
      'Esta publicación explica cómo integrar NestJS con MongoDB paso a paso.'
  })
  description: string

  @ApiProperty({
    description: 'Cantidad de vistas del contenido',
    example: 100
  })
  views: number

  @ApiProperty({
    description: 'Fecha de publicación',
    example: '2024-05-20T18:25:43.511Z'
  })
  publicationDate: Date

  @ApiProperty({ description: 'Autores del contenido', type: [Author] })
  author: Author[]

  @ApiProperty({ description: 'Categorías del contenido', type: [Category] })
  category: Category[]
}
