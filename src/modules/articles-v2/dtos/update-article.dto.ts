import { PartialType } from '@nestjs/mapped-types'
import { CreateArticleDto } from './create-article.dto'
import { IsOptional, IsInt, Min, IsEnum, IsNotEmpty } from 'class-validator'
import { IArticleStatus } from '../interfaces/article-status.enum'
import { UpdateArticleDtoSwaggerDocs } from '../documentation/swagger/dtos/update-article.swagger.dto'

export class UpdateArticleDto
  extends PartialType(CreateArticleDto)
  implements UpdateArticleDtoSwaggerDocs
{
  @IsNotEmpty()
  @IsEnum(IArticleStatus, {
    message:
      'El estado debe ser uno de los valores permitidos en IArticleStatus'
  })
  status: IArticleStatus

  @IsInt()
  @Min(0)
  views: number

  @IsInt()
  @Min(0)
  likes: number

  @IsOptional()
  @IsInt()
  @Min(0)
  dislikes?: number
}
