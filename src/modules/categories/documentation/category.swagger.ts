import { ApiProperty } from '@nestjs/swagger'

export class CategorySwaggerDocs {
  @ApiProperty({
    description: 'Título de la categoría (máximo 100 caracteres)',
    example: 'Tecnología',
    maxLength: 100
  })
  name: string
}
