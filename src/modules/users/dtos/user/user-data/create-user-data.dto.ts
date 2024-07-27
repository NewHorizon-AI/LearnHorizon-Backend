import { ApiProperty } from '@nestjs/swagger'
import { IsMongoId, IsNumber, IsOptional, Min } from 'class-validator'

export class CreateUserDataDto {
  @ApiProperty({
    description: 'ID del usuario',
    example: '607d2f77bcf86cd799439011'
  })
  @IsMongoId({ message: 'El ID del usuario debe ser un ID válido de MongoDB.' })
  user_id: string

  @ApiProperty({
    description: 'Número de artículos escritos por el usuario',
    example: 10,
    required: false // No es requerido ya que tiene un valor por defecto en el modelo.
  })
  @IsOptional()
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'El número de artículos debe ser un número válido.' }
  )
  @Min(0, { message: 'El número de artículos no puede ser menor que cero.' })
  articles_count?: number

  @ApiProperty({
    description: 'Número de comentarios hechos por el usuario',
    example: 5,
    required: false // No es requerido ya que tiene un valor por defecto en el modelo.
  })
  @IsOptional()
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'El número de comentarios debe ser un número válido.' }
  )
  @Min(0, { message: 'El número de comentarios no puede ser menor que cero.' })
  comments_count?: number
}
