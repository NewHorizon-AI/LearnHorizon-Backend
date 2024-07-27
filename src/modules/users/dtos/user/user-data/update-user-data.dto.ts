import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsNumber, IsOptional, Min } from 'class-validator'

export class UpdateUserDataDto {
  @ApiPropertyOptional({
    description: 'Número de artículos escritos por el usuario',
    example: 15
  })
  @IsOptional()
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'El número de artículos debe ser un número válido.' }
  )
  @Min(0, { message: 'El número de artículos no puede ser menor que cero.' })
  articles_count?: number

  @ApiPropertyOptional({
    description: 'Número de comentarios hechos por el usuario',
    example: 8
  })
  @IsOptional()
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'El número de comentarios debe ser un número válido.' }
  )
  @Min(0, { message: 'El número de comentarios no puede ser menor que cero.' })
  comments_count?: number
}
