import { IsOptional, ValidateNested } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

import { UpdateArticleDto } from './articleBase/update-article.dto'
import { UpdateArticleDataDto } from './articleData/update-article-data.dto'
import { UpdateArticleMarkdownDto } from './articleMarkdown/update-article-markdown.dto'
import { UpdateArticleUserDto } from './articleUser/update-article-user.dto'
import { CreateArticleCommentDto } from './articleComment/create-article-comment.dto'
import { UpdateArticleTagDto } from './articleTag/update-article-tag.dto'

export class UpdateArticleCompleteDto {
  @ValidateNested()
  @Type(() => UpdateArticleDto)
  @IsOptional()
  @ApiProperty({ description: 'Datos básicos del artículo', required: false })
  article?: UpdateArticleDto

  @ValidateNested()
  @Type(() => CreateArticleCommentDto)
  @IsOptional()
  @ApiProperty({ description: 'Comentarios del artículo', isArray: true })
  comments?: CreateArticleCommentDto[]

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

  @ValidateNested({ each: true })
  @Type(() => UpdateArticleTagDto)
  @IsOptional()
  @ApiProperty({ description: 'Etiquetas del artículo', isArray: true })
  tags?: UpdateArticleTagDto[]

  @ValidateNested({ each: true })
  @Type(() => UpdateArticleUserDto)
  @IsOptional()
  @ApiProperty({
    description: 'Usuarios asociados al artículo',
    isArray: true,
    required: false
  })
  users?: UpdateArticleUserDto[]
}
