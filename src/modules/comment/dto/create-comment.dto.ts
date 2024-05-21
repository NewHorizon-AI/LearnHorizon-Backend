import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  IsDateString
} from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateCommentDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'El ID del usuario (ObjectId)',
    example: '60d0fe4f5311236168a109ca'
  })
  user: string // Esto debería ser un ObjectId, pero los validadores de class-validator no soportan ObjectId.

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'El comentario del usuario',
    example: 'Este es un comentario de ejemplo.'
  })
  comment: string

  @IsOptional()
  @Min(0)
  @ApiPropertyOptional({
    description: 'Número de likes del comentario',
    example: 5
  })
  likes: number

  @IsOptional()
  @Min(0)
  @ApiPropertyOptional({
    description: 'Número de dislikes del comentario',
    example: 2
  })
  dislikes: number

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({
    description: 'Fecha del comentario',
    example: '2024-05-20T18:25:43.511Z'
  })
  commentDate: Date

  @IsOptional()
  @IsArray()
  @ApiPropertyOptional({
    description: 'IDs de las respuestas al comentario (array de ObjectId)',
    example: ['60d0fe4f5311236168a109cb', '60d0fe4f5311236168a109cc']
  })
  replies: string[] // Esto debería ser un array de ObjectId, pero los validadores de class-validator no soportan ObjectId.

  @IsNotEmpty()
  @ApiProperty({
    description: 'El ID de la publicación (ObjectId)',
    example: '60d0fe4f5311236168a109cd'
  })
  publication: string // Esto debería ser un ObjectId, pero los validadores de class-validator no soportan ObjectId.

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    description: 'Indica si el comentario ha sido editado',
    example: true
  })
  edited: boolean
}
