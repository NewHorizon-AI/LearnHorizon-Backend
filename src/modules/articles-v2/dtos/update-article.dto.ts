import {
  IsOptional,
  IsEnum,
  IsNotEmpty,
  IsString,
  ArrayNotEmpty,
  IsMongoId,
  IsArray,
  IsUrl
} from 'class-validator'
import { IArticleStatus } from '../interfaces/article-status.enum'
import { UpdateArticleDtoSwaggerDocs } from '../documentation/swagger/dtos/update-article.swagger.dto'
import { Category } from 'src/modules/categories-v2/schemas/category.schema'
import { User } from 'src/modules/users/schemas/user.schema'

export class UpdateArticleDto extends UpdateArticleDtoSwaggerDocs {
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

  @IsNotEmpty()
  @IsEnum(IArticleStatus, {
    message:
      'El estado debe ser uno de los valores permitidos en IArticleStatus'
  })
  status: IArticleStatus
}
