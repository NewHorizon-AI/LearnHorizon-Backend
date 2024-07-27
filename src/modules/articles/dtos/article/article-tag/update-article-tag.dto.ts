import { IsString, IsOptional } from 'class-validator'
import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateArticleTagDto } from './create-article-tag.dto'

export class UpdateArticleTagDto extends PartialType(CreateArticleTagDto) {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Etiqueta asociada al artículo',
    example: 'NestJS',
    required: false
  })
  tag?: string

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Descripción de la etiqueta',
    example: 'Esta etiqueta está relacionada con artículos sobre NestJS.',
    required: false
  })
  description?: string
}
