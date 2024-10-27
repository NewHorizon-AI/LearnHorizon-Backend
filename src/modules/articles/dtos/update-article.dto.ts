import {
  IsOptional,
  IsEnum,
  IsString,
  IsMongoId,
  IsArray,
  IsUrl,
  IsNumber
} from 'class-validator'
import { IArticleStatus } from '../interfaces/article-status.enum'
import { UpdateArticleDtoSwaggerDocs } from '../documentation/swagger/dtos/update-article.swagger.dto'

import { Types } from 'mongoose'

export class UpdateArticleDto extends UpdateArticleDtoSwaggerDocs {
  @IsOptional()
  @IsString()
  title?: string

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
  status?: IArticleStatus

  @IsOptional()
  @IsNumber()
  views?: number

  @IsOptional()
  @IsNumber()
  likes?: number

  @IsOptional()
  @IsNumber()
  dislikes?: number

  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  users?: Types.ObjectId[]

  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  categories?: Types.ObjectId[]
}
