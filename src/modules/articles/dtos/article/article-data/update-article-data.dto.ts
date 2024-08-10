import { IsString, IsOptional, IsUrl, IsInt, Min } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateArticleDataDto {
  @IsUrl()
  @IsOptional()
  @ApiProperty({
    description: 'URL de la foto del artículo',
    example: 'https://example.com/photo.jpg',
    required: false
  })
  photo?: string

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Descripción del artículo',
    example: 'Este es un artículo sobre NestJS y MongoDB.',
    required: false
  })
  description?: string

  @IsInt()
  @Min(0)
  @IsOptional()
  @ApiProperty({
    description: 'Número de vistas del artículo',
    example: 100,
    required: false,
    default: 0
  })
  views?: number

  @IsInt()
  @Min(0)
  @IsOptional()
  @ApiProperty({
    description: 'Número de likes del artículo',
    example: 50,
    required: false,
    default: 0
  })
  likes?: number

  @IsInt()
  @Min(0)
  @IsOptional()
  @ApiProperty({
    description: 'Número de dislikes del artículo',
    example: 5,
    required: false,
    default: 0
  })
  dislikes?: number
}
