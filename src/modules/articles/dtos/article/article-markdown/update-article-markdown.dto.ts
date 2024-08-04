import { IsString, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateArticleMarkdownDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Contenido en formato Markdown del artículo',
    example: '## Título del Artículo\nEste es el contenido en Markdown.',
    required: false
  })
  content?: string
}
