import { IsString, IsOptional, IsMongoId } from 'class-validator'
import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateArticleMarkdownDto } from './create-article-markdown.dto'

export class UpdateArticleMarkdownDto extends PartialType(
  CreateArticleMarkdownDto
) {
  @IsMongoId()
  @IsOptional()
  @ApiProperty({
    description: 'ID del artículo',
    example: '60d2f77bcf86cd799439012',
    required: false
  })
  article_id?: string

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Contenido en formato Markdown del artículo',
    example: '## Título del Artículo\nEste es el contenido en Markdown.',
    required: false
  })
  content?: string
}
