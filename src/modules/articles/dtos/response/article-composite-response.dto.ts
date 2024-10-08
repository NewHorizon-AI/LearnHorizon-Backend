import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

// * Importar Dtos Necesarios
import { CreateArticleDto } from '../article/article-base/create-article.dto'
import { CreateArticleDataDto } from '../article/article-data/create-article-data.dto'
import { CreateArticleMarkdownDto } from '../article/article-markdown/create-article-markdown.dto'
// import { CreateArticleModelTransformationDto } from 'src/modules/article-model/dtos/article-model-transformation/create-article-model-transformation.dto'

export class ArticleCompositeResponseDto {
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

  // @ApiProperty({
  //   description: 'Contenido en de transformaciones del artículo',
  //   type: CreateArticleModelTransformationDto
  // })
  // @IsOptional()
  // @ValidateNested()
  // @Type(() => CreateArticleMarkdownDto)
  // transformation?: CreateArticleModelTransformationDto
}
