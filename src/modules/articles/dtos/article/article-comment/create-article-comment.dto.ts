import { IsString, IsNotEmpty, IsMongoId } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateArticleCommentDto {
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

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Contenido del comentario',
    example: 'Este es un comentario sobre el artículo.'
  })
  content: string
}
