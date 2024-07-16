import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  Min,
  IsDate
} from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class UpdatePublicationDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Título de la publicación',
    example: 'Mi primer artículo'
  })
  title: string

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'URL de la foto de la publicación',
    example: 'https://example.com/photo.jpg'
  })
  photo: string

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Subtítulo de la publicación',
    example: 'Una introducción a mi artículo'
  })
  subtitle: string

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Descripción de la publicación',
    example: 'Esta es una descripción detallada de mi artículo'
  })
  description: string

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Contenido en markdown de la publicación',
    example: '# Mi Artículo\nEste es el contenido de mi artículo en markdown.'
  })
  markdownContent: string

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional({
    description: 'Etiquetas de la publicación',
    example: ['artículo', 'introducción', 'markdown']
  })
  tags: string[]

  @IsOptional()
  @IsDate()
  @ApiPropertyOptional({
    description: 'Fecha de publicación',
    example: '2024-05-20T18:25:43.511Z'
  })
  publicationDate: Date

  @IsOptional()
  @Min(0)
  @ApiPropertyOptional({
    description: 'Número de vistas de la publicación',
    example: 150
  })
  views: number

  @IsOptional()
  @Min(0)
  @ApiPropertyOptional({
    description: 'Número de likes de la publicación',
    example: 20
  })
  likes: number

  @IsOptional()
  @Min(0)
  @ApiPropertyOptional({
    description: 'Número de dislikes de la publicación',
    example: 5
  })
  dislikes: number

  @IsOptional()
  @ApiPropertyOptional({
    description: 'ID del autor de la publicación (ObjectId)',
    example: '60d0fe4f5311236168a109ca'
  })
  author: string // Esto debería ser un ObjectId, pero los validadores de class-validator no soportan ObjectId.

  @IsOptional()
  @ApiPropertyOptional({
    description: 'ID de la categoría de la publicación (ObjectId)',
    example: '60d0fe4f5311236168a109cb'
  })
  category: string // Esto debería ser un ObjectId, pero los validadores de class-validator no soportan ObjectId.

  @IsOptional()
  @IsEnum(['published', 'review', 'draft'])
  @ApiPropertyOptional({
    description: 'Estado de la publicación',
    example: 'published'
  })
  status: string

  @IsOptional()
  @IsArray()
  @ApiPropertyOptional({
    description: 'Comentarios de la publicación (array de ObjectId)',
    example: ['60d0fe4f5311236168a109cc', '60d0fe4f5311236168a109cd']
  })
  comments: string[] // Esto debería ser un array de ObjectId, pero los validadores de class-validator no soportan ObjectId.
}
