import { ApiProperty } from '@nestjs/swagger'
import { IArticleStatus } from 'src/modules/articles-v2/interfaces/article-status.enum'
import { Category } from 'src/modules/categories-v2/schemas/category.schema'
import { User } from 'src/modules/users/schemas/user.schema'

// *  Importar los esquemas necesarios

export class UpdateArticleDtoSwaggerDocs {
  @ApiProperty({
    description: 'Título del artículo',
    example: 'Cómo usar NestJS con MongoDB',
    default: 'Nuevo artículo',
    maxLength: 100
  })
  title?: string

  @ApiProperty({
    description: 'Autores del artículo',
    example: '[UserObjectId1, UserObjectId2]'
  })
  users?: User[]

  @ApiProperty({
    description: 'Categorías del artículo',
    example: '[CategoryObjectId1, CategoryObjectId2]'
  })
  categories?: Category[]

  @ApiProperty({
    description: 'URL de la foto del artículo',
    example: 'https://example.com/photo.jpg'
  })
  photo?: string

  @ApiProperty({
    description: 'Descripción del artículo',
    example: 'Este es un artículo sobre NestJS y MongoDB.'
  })
  description?: string

  @ApiProperty({
    description: 'Contenido del artículo en formato Markdown',
    example: '# Título\n\nContenido del artículo'
  })
  content?: string

  @ApiProperty({
    description: 'Estado del artículo',
    example: IArticleStatus.PUBLISHED,
    default: IArticleStatus.DRAFT
  })
  status?: IArticleStatus
}
