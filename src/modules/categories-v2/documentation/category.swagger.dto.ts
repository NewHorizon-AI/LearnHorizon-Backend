import { ApiProperty } from '@nestjs/swagger'

export class CategorySwaggerDocs {
  @ApiProperty({
    description: 'Título de la categoría (máximo 100 caracteres)',
    example: 'Tecnología',
    maxLength: 100
  })
  name: string

  @ApiProperty({
    description:
      'Cantidad de artículos en la categoría. No puede ser negativo.',
    example: 10,
    minimum: 0
  })
  numberOfArticles: number
}
