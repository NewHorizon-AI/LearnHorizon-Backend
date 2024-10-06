import { ApiProperty } from '@nestjs/swagger'
import { IArticleStatus } from '../../../interfaces/article-status.enum'

export class StatusDocs {
  static status = ApiProperty({
    description: 'Estado del artículo',
    enum: IArticleStatus,
    example: IArticleStatus.PUBLISHED
  })
}
