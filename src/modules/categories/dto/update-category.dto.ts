import { IsOptional, IsString } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'El nuevo título de la categoría',
    example: 'Electrónica y Gadgets'
  })
  title: string

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'La nueva descripción de la categoría',
    example: 'Categoría de productos electrónicos y gadgets'
  })
  description: string
}
