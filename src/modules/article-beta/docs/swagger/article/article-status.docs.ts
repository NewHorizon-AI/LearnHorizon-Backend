import { ApiProperty } from '@nestjs/swagger'
import { ArticleStatus } from '../../../interfaces/article-status.enum'

export class ArticleStatusDocs {
  static status = ApiProperty({
    description: 'Estado del artículo',
    enum: ArticleStatus,
    example: ArticleStatus.PUBLISHED
  })
}
