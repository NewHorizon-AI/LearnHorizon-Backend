import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

import { CreateArticleDto } from './articleBase/create-article.dto'
import { CreateArticleCommentDto } from './articleComment/create-article-comment.dto'
import { CreateArticleDataDto } from './articleData/create-article-data.dto'
import { CreateArticleMarkdownDto } from './articleMarkdown/create-article-markdown.dto'
import { CreateArticleTagDto } from './articleTag/create-article-tag.dto'
import { CreateArticleUserDto } from './articleUser/create-article-user.dto'

export class CreateArticleCompleteDto {
  @ValidateNested()
  @Type(() => CreateArticleDto)
  @IsNotEmpty()
  @ApiProperty({ description: 'Datos básicos del artículo' })
  article: CreateArticleDto

  @ValidateNested({ each: true })
  @Type(() => CreateArticleCommentDto)
  @IsOptional()
  @ApiProperty({ description: 'Comentarios del artículo', isArray: true })
  comments?: CreateArticleCommentDto[]

  @ValidateNested()
  @Type(() => CreateArticleDataDto)
  @IsOptional()
  @ApiProperty({ description: 'Datos adicionales del artículo' })
  data?: CreateArticleDataDto

  @ValidateNested()
  @Type(() => CreateArticleMarkdownDto)
  @IsOptional()
  @ApiProperty({ description: 'Contenido en Markdown del artículo' })
  markdown?: CreateArticleMarkdownDto

  @ValidateNested({ each: true })
  @Type(() => CreateArticleTagDto)
  @IsOptional()
  @ApiProperty({ description: 'Etiquetas del artículo', isArray: true })
  tags?: CreateArticleTagDto[]

  @ValidateNested({ each: true })
  @Type(() => CreateArticleUserDto)
  @IsOptional()
  @ApiProperty({ description: 'Usuarios asociados al artículo', isArray: true })
  users?: CreateArticleUserDto[]
}
