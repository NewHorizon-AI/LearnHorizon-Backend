import { IArticleStatus } from '../../../interfaces/article-status.enum'

export const PostArticleDocs = {
  title: {
    description: 'Título de la publicación',
    example: 'Cómo usar NestJS con MongoDB',
    default: 'Nuevo artículo'
  },
  status: {
    description: 'Estado de la publicación',
    example: IArticleStatus.PUBLISHED,
    enum: IArticleStatus,
    default: IArticleStatus.DRAFT
  },
  users: {
    description:
      'Array de IDs de MongoDB que hacen referencia a los IDs de usuarios (_id) en la colección de Users',
    example: '["5f1f1e8facb704535c4f7d8b", "5f1f1e8facb704535c4f7d8c"]',
    type: 'string',
    isArray: true
  }
}
