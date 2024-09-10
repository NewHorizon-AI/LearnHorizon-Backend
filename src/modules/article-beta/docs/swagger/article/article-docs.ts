import { ArticleStatus } from '../../../interfaces/article-status.enum'

export class ArticleDocs {
  static title = {
    description: 'Título del artículo',
    example: 'Cómo usar NestJS con MongoDB',
    default: 'Nuevo artículo'
  }

  static users = {
    description: 'Autores del artículo',
    example: '[UserObjectId1, UserObjectId2]'
  }

  static status = {
    description: 'Estado del artículo',
    example: ArticleStatus.PUBLISHED,
    default: ArticleStatus.DRAFT
  }
}
