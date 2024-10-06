import {
  IsString,
  IsArray,
  ArrayNotEmpty,
  IsMongoId,
  IsOptional,
  IsEnum
} from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IArticleStatus } from '../interfaces/article-status.enum'
import { User } from 'src/modules/users/schemas/user.schema'

import { PostArticleDocs } from '../docs/swagger/dto/article.doc'

export class CreateArticleDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional(PostArticleDocs.title)
  title?: string

  @IsOptional()
  @IsEnum(IArticleStatus, {
    message:
      'El estado debe ser uno de los valores permitidos en IArticleStatus'
  })
  @ApiPropertyOptional(PostArticleDocs.status)
  status?: IArticleStatus

  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  @ApiProperty(PostArticleDocs.users)
  users: User[]
}
