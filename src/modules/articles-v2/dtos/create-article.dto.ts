import {
  IsString,
  IsArray,
  ArrayNotEmpty,
  IsMongoId,
  IsOptional,
  IsNotEmpty,
  IsUrl
} from 'class-validator'

import { CreateArticleDtoSwaggerDocs } from '../documentation/swagger/dtos/create-article.swagger.dto'
import { Types } from 'mongoose'

export class CreateArticleDto extends CreateArticleDtoSwaggerDocs {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  users: Types.ObjectId[]

  @IsArray()
  @IsMongoId({ each: true })
  categories?: Types.ObjectId[]

  @IsUrl()
  @IsOptional()
  photo: string

  @IsString()
  @IsOptional()
  description: string

  @IsString()
  @IsOptional()
  content: string
}
