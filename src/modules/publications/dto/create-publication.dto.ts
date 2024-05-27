import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  IsDate
} from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreatePublicationDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Título de la publicación',
    example: 'Mi primer artículo'
  })
  title: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'URL de la foto de la publicación',
    example: 'https://example.com/photo.jpg'
  })
  photo: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Subtítulo de la publicación',
    example: 'Una introducción a mi artículo'
  })
  subtitle: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Descripción de la publicación',
    example: 'Esta es una descripción detallada de mi artículo'
  })
  description: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
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

  @IsNotEmpty()
  @ApiProperty({
    description: 'ID del autor de la publicación (ObjectId)',
    example: '60d0fe4f5311236168a109ca'
  })
  author: string // Esto debería ser un ObjectId, pero los validadores de class-validator no soportan ObjectId.

  @IsNotEmpty()
  @ApiProperty({
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

  // Campos opcionales para publicaciones de modelos 3D

  @ApiProperty({
    description: 'ID del modelo 3D asociado (opcional)',
    type: String,
    required: false
  })
  @IsOptional()
  @IsString()
  model3D?: string

  @ApiProperty({
    description: 'Coordenadas [x, y, z] (opcional)',
    type: [Number],
    required: false,
    example: [10, 20, 30]
  })
  @IsArray()
  @IsOptional()
  coordinates?: number[]

  @ApiProperty({
    description: 'Ángulos de rotación [x, y, z] (opcional)',
    type: [Number],
    required: false,
    example: [45, 30, 60]
  })
  @IsArray()
  @IsOptional()
  rotationAngles?: number[]

  @ApiProperty({
    description: 'Escala [x, y, z] (opcional)',
    type: [Number],
    required: false,
    example: [1, 1, 1]
  })
  @IsArray()
  @IsOptional()
  scale?: number[]
}
