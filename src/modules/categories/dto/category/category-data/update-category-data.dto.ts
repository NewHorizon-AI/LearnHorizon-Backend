import { IsOptional, IsString, IsMongoId, IsInt, Min } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateCategoryDataDto {
  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    description: 'ID de la categoría',
    example: '607d2f77bcf86cd799439011'
  })
  category_id?: string

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Descripción de la categoría',
    example: 'Categoría relacionada con tecnología y gadgets.'
  })
  description?: string

  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({
    description: 'Cantidad de artículos en la categoría',
    example: 10,
    default: 0
  })
  articles_count?: number
}
