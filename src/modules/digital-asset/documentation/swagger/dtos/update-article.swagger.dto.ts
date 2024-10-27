import { ApiProperty } from '@nestjs/swagger'
import { IArticleStatus } from 'src/modules/articles/interfaces/article-status.enum'

// *  Importar los esquemas necesarios

export class UpdateArticleDtoSwaggerDocs {
  @ApiProperty({
    description: 'Número de vistas del artículo',
    example: 100,
    default: 0
  })
  views: number

  @ApiProperty({
    description: 'Número de likes del artículo',
    example: 50,
    default: 0
  })
  likes: number

  @ApiProperty({
    description: 'Estado del artículo',
    example: IArticleStatus.PUBLISHED,
    default: IArticleStatus.DRAFT
  })
  status: IArticleStatus
}
