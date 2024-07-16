import { IsOptional, IsMongoId } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateArticleCategoryDto {
  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    description: 'ID de la categoría',
    example: '607d2f77bcf86cd799439011'
  })
  category_id?: string

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    description: 'ID del artículo',
    example: '607d2f77bcf86cd799439011'
  })
  article_id?: string
}
