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
import { Category } from 'src/modules/categories/schemas/category.schema'
import { User } from 'src/modules/users/schemas/user.schema'

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
  tags?: string[]

  @IsOptional()
  @IsDate()
  @ApiPropertyOptional({
    description: 'Fecha de publicación',
    example: '2024-05-20T18:25:43.511Z'
  })
  publicationDate?: Date

  @IsOptional()
  @Min(0)
  @ApiPropertyOptional({
    description: 'Número de vistas de la publicación',
    example: 150
  })
  views?: number

  @IsOptional()
  @Min(0)
  @ApiPropertyOptional({
    description: 'Número de likes de la publicación',
    example: 20
  })
  likes?: number

  @IsOptional()
  @Min(0)
  @ApiPropertyOptional({
    description: 'Número de dislikes de la publicación',
    example: 5
  })
  dislikes?: number

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    description: 'ID del autor de la publicación (ObjectId)',
    example: '60d0fe4f5311236168a109ca'
  })
  author: User[]

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    description: 'ID de la categoría de la publicación (ObjectId)',
    example: '60d0fe4f5311236168a109cb'
  })
  category: Category[]

  @IsOptional()
  @IsEnum(['published', 'review', 'draft'])
  @ApiPropertyOptional({
    description: 'Estado de la publicación',
    example: 'published'
  })
  status?: string

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional({
    description: 'Comentarios de la publicación (array de ObjectId)',
    example: ['60d0fe4f5311236168a109cc', '60d0fe4f5311236168a109cd']
  })
  comments?: string[]
}
