import { IsOptional, ValidateNested } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

import { UpdateArticleDto } from '../article/article-base/update-article.dto'
import { UpdateArticleDataDto } from '../article/article-data/update-article-data.dto'
import { UpdateArticleMarkdownDto } from '../article/article-markdown/update-article-markdown.dto'

// Dto External
// import { UpdateModelTransformationDto } from 'src/modules/article-entry/dtos/article-entry/model-transformation/update-model-transformation.dto'
// // import { UpdateArticleTagDto } from './article-tag/update-article-tag.dto'

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
  data?: UpdateArticleDataDto

  @ValidateNested()
  @Type(() => UpdateArticleMarkdownDto)
  @IsOptional()
  @ApiProperty({
    description: 'Contenido en Markdown del artículo',
    required: false
  })
  markdown?: UpdateArticleMarkdownDto

  // @ValidateNested()
  // @Type(() => UpdateArticleMarkdownDto)
  // @IsOptional()
  // @ApiProperty({
  //   description: 'Contenido en Markdown del artículo',
  //   required: false
  // })
  // transformation?: UpdateModelTransformationDto
}
