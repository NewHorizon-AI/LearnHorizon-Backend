import { IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Título de la categoría',
    example: 'Tecnología'
  })
  name?: string
}
