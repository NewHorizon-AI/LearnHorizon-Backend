import { IsMongoId, IsOptional } from 'class-validator'
import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateArticleUserDto } from './create-article-user.dto'

export class UpdateArticleUserDto extends PartialType(CreateArticleUserDto) {
  @IsMongoId()
  @IsOptional()
  @ApiProperty({
    description: 'ID del usuario',
    example: '607d2f77bcf86cd799439011',
    required: false
  })
  user_id?: string

  @IsMongoId()
  @IsOptional()
  @ApiProperty({
    description: 'ID del artículo',
    example: '60d2f77bcf86cd799439012',
    required: false
  })
  article_id?: string
}
