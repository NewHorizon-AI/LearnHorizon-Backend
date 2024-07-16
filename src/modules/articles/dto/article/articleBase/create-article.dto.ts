import { IsNotEmpty, IsString, IsEnum } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

import { ArticleStatus } from '../../shared/interfaces/article-status.enum'

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Título de la publicación',
    example: 'Cómo usar NestJS con MongoDB'
  })
  title: string

  @IsNotEmpty()
  @IsEnum(ArticleStatus)
  @ApiProperty({
    description: 'Estado de la publicación',
    example: ArticleStatus.PUBLISHED
  })
  status: ArticleStatus
}
