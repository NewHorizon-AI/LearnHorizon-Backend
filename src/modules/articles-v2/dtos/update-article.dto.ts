import {
  IsOptional,
  IsEnum,
  IsString,
  IsMongoId,
  IsArray,
  IsUrl
} from 'class-validator'
import { IArticleStatus } from '../interfaces/article-status.enum'
import { UpdateArticleDtoSwaggerDocs } from '../documentation/swagger/dtos/update-article.swagger.dto'

import { Types } from 'mongoose'

export class UpdateArticleDto extends UpdateArticleDtoSwaggerDocs {
  @IsOptional()
  @IsString()
  title?: string

  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  users?: Types.ObjectId[]

  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  categories?: Types.ObjectId[]

  @IsUrl()
  @IsOptional()
  photo?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  content?: string

  @IsOptional()
  @IsEnum(IArticleStatus, {
    message:
      'El estado debe ser uno de los valores permitidos en IArticleStatus'
  })
  status: IArticleStatus
}
