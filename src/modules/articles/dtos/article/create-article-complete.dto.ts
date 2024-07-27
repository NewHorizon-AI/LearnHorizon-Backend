import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

import { CreateArticleDto } from './article-base/create-article.dto'
import { CreateArticleDataDto } from './article-data/create-article-data.dto'
import { CreateArticleMarkdownDto } from './article-markdown/create-article-markdown.dto'
import { CreateArticleTagDto } from './article-tag/create-article-tag.dto'

export class CreateArticleCompleteDto {
  @ApiProperty({
    description: 'Datos básicos del artículo',
    type: CreateArticleDto
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateArticleDto)
  article: CreateArticleDto

  @ApiProperty({
    description: 'Datos adicionales del artículo',
    type: CreateArticleDataDto
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateArticleDataDto)
  data?: CreateArticleDataDto

  @ApiProperty({
    description: 'Contenido en Markdown del artículo',
    type: CreateArticleMarkdownDto
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateArticleMarkdownDto)
  markdown?: CreateArticleMarkdownDto

  @ApiProperty({
    description: 'Etiquetas del artículo',
    isArray: true,
    type: CreateArticleTagDto
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateArticleTagDto)
  tags?: CreateArticleTagDto[]
}
