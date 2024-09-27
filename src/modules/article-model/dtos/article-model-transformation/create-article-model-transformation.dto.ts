import {
  IsArray,
  IsNumber,
  ArrayMinSize,
  IsOptional,
  IsNotEmpty
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Types } from 'mongoose'

export class CreateArticleModelTransformationDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID de la entrada del modelo de articulo',
    example: '60d2f77bcf86cd799439012'
  })
  article_model_id: Types.ObjectId

  @IsOptional()
  @IsArray()
  @ArrayMinSize(3)
  @IsNumber({}, { each: true })
  @ApiProperty({
    description: 'Escala del modelo',
    example: [1, 1, 1],
    default: [1, 1, 1]
  })
  scale?: number[] = [1, 1, 1]

  @IsOptional()
  @IsArray()
  @ArrayMinSize(3)
  @IsNumber({}, { each: true })
  @ApiProperty({
    description: 'Rotación del modelo',
    example: [0, 0, 0],
    default: [0, 0, 0]
  })
  rotation?: number[] = [0, 0, 0]

  @IsOptional()
  @IsArray()
  @ArrayMinSize(3)
  @IsNumber({}, { each: true })
  @ApiProperty({
    description: 'Posición del modelo',
    example: [0, 0, 0],
    default: [0, 0, 0]
  })
  position?: number[] = [0, 0, 0]
}
