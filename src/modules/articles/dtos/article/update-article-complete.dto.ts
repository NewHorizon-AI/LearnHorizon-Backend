import { IsOptional, ValidateNested } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

import { UpdateArticleDto } from './article-base/update-article.dto'
import { UpdateArticleDataDto } from './article-data/update-article-data.dto'
import { UpdateArticleMarkdownDto } from './article-markdown/update-article-markdown.dto'

// import { UpdateArticleTagDto } from './article-tag/update-article-tag.dto'

export class UpdateArticleCompleteDto {
  @ValidateNested()
  @Type(() => UpdateArticleDto)
  @IsOptional()
  @ApiProperty({ description: 'Datos básicos del artículo', required: false })
  article?: UpdateArticleDto

  @ValidateNested()
  @Type(() => UpdateArticleDataDto)
  @IsOptional()
  @ApiProperty({
    description: 'Datos adicionales del artículo',
    required: false
  })
  articleData?: UpdateArticleDataDto

  @ValidateNested()
  @Type(() => UpdateArticleMarkdownDto)
  @IsOptional()
  @ApiProperty({
    description: 'Contenido en Markdown del artículo',
    required: false
  })
  articleMarkdown?: UpdateArticleMarkdownDto

  // @ValidateNested({ each: true })
  // @Type(() => UpdateArticleTagDto)
  // @IsOptional()
  // @ApiProperty({ description: 'Etiquetas del artículo', isArray: true })
  // tags?: UpdateArticleTagDto[]
}
