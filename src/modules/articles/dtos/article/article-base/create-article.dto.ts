import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsArray,
  ArrayNotEmpty,
  IsMongoId
} from 'class-validator'
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
  @IsEnum(ArticleStatus, {
    message: 'El estado debe ser uno de los valores permitidos en ArticleStatus'
  })
  @ApiProperty({
    description: 'Estado de la publicación',
    example: ArticleStatus.PUBLISHED,
    enum: ArticleStatus
  })
  status: ArticleStatus

  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  @ApiProperty({
    description:
      'Array de IDs de MongoDB que hacen referencia a los IDs de usuarios (_id) en la colección de Users',
    example: '["5f1f1e8facb704535c4f7d8b", "5f1f1e8facb704535c4f7d8c"]',
    type: 'string',
    isArray: true
  })
  users: string[]
}
