import { IsNotEmpty, ValidateNested, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

import { CreateCategoryDto } from './category/category-base/create-category.dto'
import { CreateCategoryDataDto } from './category/category-data/create-category-data.dto'
import { CreateArticleCategoryDto } from './category/article-category/create-article-category.dto'

export class CreateCategoryCompleteDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateCategoryDto)
  @ApiProperty({
    description: 'Datos de la categoría',
    type: CreateCategoryDto
  })
  category: CreateCategoryDto

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateCategoryDataDto)
  @ApiProperty({
    description: 'Datos adicionales de la categoría',
    type: CreateCategoryDataDto,
    required: false
  })
  categoryData?: CreateCategoryDataDto

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateArticleCategoryDto)
  @ApiProperty({
    description: 'Datos de las categorías de artículos',
    type: CreateArticleCategoryDto,
    required: false
  })
  articleCategory?: CreateArticleCategoryDto[]
}
