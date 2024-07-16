import { IsString, IsOptional, IsMongoId } from 'class-validator'
import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateArticleCommentDto } from './create-article-comment.dto'

export class UpdateArticleCommentDto extends PartialType(
  CreateArticleCommentDto
) {
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

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Contenido del comentario',
    example: 'Este es un comentario sobre el artículo.',
    required: false
  })
  content?: string
}
