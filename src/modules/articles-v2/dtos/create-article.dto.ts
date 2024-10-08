import {
  IsString,
  IsArray,
  ArrayNotEmpty,
  IsMongoId,
  IsOptional,
  IsNotEmpty,
  IsUrl
} from 'class-validator'

import { User } from 'src/modules/users/schemas/user.schema'
import { Category } from 'src/modules/categories-v2/schemas/category.schema'
import { CreateArticleDtoSwaggerDocs } from '../documentation/swagger/dtos/create-article.swagger.dto'

export class CreateArticleDto extends CreateArticleDtoSwaggerDocs {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  users: User[]

  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  categories: Category[]

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
