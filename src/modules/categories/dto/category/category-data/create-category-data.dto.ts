import {
  IsNotEmpty,
  IsString,
  IsMongoId,
  IsOptional,
  IsInt,
  Min
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCategoryDataDto {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({
    description: 'ID de la categoría',
    example: '607d2f77bcf86cd799439011'
  })
  category_id: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Descripción de la categoría',
    example: 'Categoría relacionada con tecnología y gadgets.'
  })
  description: string

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
