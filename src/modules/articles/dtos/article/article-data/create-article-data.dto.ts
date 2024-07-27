import {
  IsString,
  IsNotEmpty,
  IsMongoId,
  IsUrl,
  IsOptional,
  IsInt,
  Min,
  ValidateNested
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { CreateArticleTagDto } from '../article-tag/create-article-tag.dto'

export class CreateArticleDataDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID del artículo',
    example: '60d2f77bcf86cd799439012'
  })
  article_id: string

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({
    description: 'URL de la foto del artículo',
    example: 'https://example.com/photo.jpg'
  })
  photo: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Descripción del artículo',
    example: 'Este es un artículo sobre NestJS y MongoDB.'
  })
  description: string

  @IsInt()
  @Min(0)
  @IsOptional()
  @ApiProperty({
    description: 'Número de vistas del artículo',
    example: 100,
    default: 0
  })
  views?: number

  @IsInt()
  @Min(0)
  @IsOptional()
  @ApiProperty({
    description: 'Número de likes del artículo',
    example: 50,
    default: 0
  })
  likes?: number

  @IsInt()
  @Min(0)
  @IsOptional()
  @ApiProperty({
    description: 'Número de dislikes del artículo',
    example: 5,
    default: 0
  })
  dislikes?: number

  @ValidateNested({ each: true })
  @Type(() => CreateArticleTagDto)
  @IsOptional()
  @ApiProperty({
    description: 'Etiquetas asociadas al artículo',
    type: [CreateArticleTagDto],
    required: false
  })
  tags?: CreateArticleTagDto[]
}
