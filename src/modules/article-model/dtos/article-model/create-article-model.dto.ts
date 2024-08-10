import { IsNotEmpty, IsMongoId, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Types } from 'mongoose'

export class CreateArticleModelDto {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({
    description: 'ID del artículo asociado con el modelo',
    example: '60d2f77bcf86cd799439012'
  })
  article_id: Types.ObjectId

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    description: 'ID de transformación aplicada al modelo, si aplica',
    example: '60d2f77bcf86cd799439013',
    required: false
  })
  transformation_id?: Types.ObjectId

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    description: 'ID del archivo del modelo',
    example: '60d2f77bcf86cd799439014',
    required: false
  })
  file_id?: Types.ObjectId
}
