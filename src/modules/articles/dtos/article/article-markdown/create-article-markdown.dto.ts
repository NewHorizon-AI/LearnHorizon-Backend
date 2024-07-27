import { IsString, IsNotEmpty, IsMongoId } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateArticleMarkdownDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID del artículo',
    example: '60d2f77bcf86cd799439012'
  })
  article_id: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Contenido en formato Markdown del artículo',
    example: '## Título del Artículo\nEste es el contenido en Markdown.'
  })
  content: string
}
