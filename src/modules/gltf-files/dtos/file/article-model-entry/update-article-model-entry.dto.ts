import { IsOptional, IsString, IsMongoId } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateArticleModelEntryDto {
  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    description: 'ID del artículo',
    example: '60d2f77bcf86cd799439012'
  })
  article_id?: string

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Nombre del modelo',
    example: 'Nombre del modelo del artículo'
  })
  name?: string
}
