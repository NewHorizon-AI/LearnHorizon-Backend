import { IsNotEmpty, IsMongoId } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateArticleModelEntryDto {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({
    description: 'ID del artículo',
    example: '60d2f77bcf86cd799439012'
  })
  article_id: string
}
