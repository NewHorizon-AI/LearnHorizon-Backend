import {
  IsOptional,
  IsString,
  IsEnum,
  IsArray,
  IsMongoId
} from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { ArticleStatus } from '../../../interfaces/article-status.enum'

import { User } from 'src/modules/users/schemas/user.schema'

export class UpdateArticleDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Título de la publicación, opcional para actualización',
    example: 'Cómo usar NestJS con MongoDB',
    default: 'Nuevo artículo'
  })
  title?: string

  @IsOptional()
  @IsEnum(ArticleStatus, {
    message: 'El estado debe ser uno de los valores permitidos en ArticleStatus'
  })
  @ApiPropertyOptional({
    description: 'Estado de la publicación, opcional para actualización',
    example: ArticleStatus.PUBLISHED,
    enum: ArticleStatus,
    default: ArticleStatus.DRAFT
  })
  status?: ArticleStatus

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  @ApiPropertyOptional({
    description:
      'Array de IDs de MongoDB que hacen referencia a los IDs de usuarios (_id) en la colección de Users',
    example: '["5f1f1e8facb704535c4f7d8b", "5f1f1e8facb704535c4f7d8c"]',
    type: 'string',
    isArray: true
  })
  users?: User[]
}
