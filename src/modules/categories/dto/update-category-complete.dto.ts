import { IsOptional, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

import { UpdateCategoryDto } from './category/category-base/update-category.dto'
import { UpdateCategoryDataDto } from './category/category-data/update-category-data.dto'
import { UpdateArticleCategoryDto } from './category/article-category/update-article-category.dto'

export class UpdateCategoryCompleteDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateCategoryDto)
  @ApiProperty({
    description: 'Datos de la categoría',
    type: UpdateCategoryDto,
    required: false
  })
  category?: UpdateCategoryDto

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateCategoryDataDto)
  @ApiProperty({
    description: 'Datos adicionales de la categoría',
    type: UpdateCategoryDataDto,
    required: false
  })
  categoryData?: UpdateCategoryDataDto

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateArticleCategoryDto)
  @ApiProperty({
    description: 'Datos de las categorías de artículos',
    type: UpdateArticleCategoryDto,
    required: false
  })
  articleCategory?: UpdateArticleCategoryDto[]
}
