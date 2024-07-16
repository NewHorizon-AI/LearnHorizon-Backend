import { IsNotEmpty, IsString, IsMongoId } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateArticleCategoryDto {
  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  @ApiProperty({
    description: 'ID de la categoría',
    example: '607d2f77bcf86cd799439011'
  })
  category_id: string

  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  @ApiProperty({
    description: 'ID del artículo',
    example: '607d2f77bcf86cd799439011'
  })
  article_id: string
}
