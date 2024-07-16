import { IsOptional, IsString, IsEnum } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

import { ArticleStatus } from '../../shared/interfaces/article-status.enum'

export class UpdateArticleDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Título de la publicación',
    example: 'Cómo usar NestJS con MongoDB'
  })
  title?: string

  @IsOptional()
  @IsEnum(ArticleStatus)
  @ApiPropertyOptional({
    description: 'Estado de la publicación',
    example: ArticleStatus.PUBLISHED
  })
  status?: ArticleStatus
}
