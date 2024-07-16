import { IsMongoId, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateArticleUserDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID del usuario',
    example: '607d2f77bcf86cd799439011'
  })
  user_id: string

  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID del artículo',
    example: '60d2f77bcf86cd799439012'
  })
  article_id: string
}
