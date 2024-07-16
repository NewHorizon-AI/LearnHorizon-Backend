import { IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateArticleTagDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Etiqueta asociada al artículo',
    example: 'NestJS'
  })
  tag: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Descripción de la etiqueta',
    example: 'Esta etiqueta está relacionada con artículos sobre NestJS.'
  })
  description: string
}
