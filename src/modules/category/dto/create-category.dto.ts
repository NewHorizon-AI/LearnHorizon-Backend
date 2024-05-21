import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'El título de la categoría',
    example: 'Electrónica'
  })
  title: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'La descripción de la categoría',
    example: 'Categoría de productos electrónicos'
  })
  description: string
}
