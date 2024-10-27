import { ApiProperty } from '@nestjs/swagger'

// *  Importar los esquemas necesarios

import { IsOptional } from 'class-validator'
import { Types } from 'mongoose'

export class CreateArticleDtoSwaggerDocs {
  @ApiProperty({
    description: 'Título del artículo',
    example: 'Cómo usar NestJS con MongoDB',
    default: 'Nuevo artículo',
    maxLength: 100
  })
  title: string

  @ApiProperty({
    description: 'Autores del artículo',
    example: '["6705c5e6a32ebafb45d0f14e"]'
  })
  users: Types.ObjectId[]

  @ApiProperty({
    description: 'Categorías del artículo',
    example: '["6705c5e6a32ebafb45d0f14e"]'
  })
  @IsOptional()
  categories?: Types.ObjectId[]

  @ApiProperty({
    description: 'URL de la foto del artículo',
    example: 'https://example.com/photo.jpg'
  })
  @IsOptional()
  photo?: string

  @ApiProperty({
    description: 'Descripción del artículo',
    example: 'Este es un artículo sobre NestJS y MongoDB.'
  })
  @IsOptional()
  description?: string

  @ApiProperty({
    description: 'Contenido del artículo en formato Markdown',
    example: '# Título\n\nContenido del artículo'
  })
  @IsOptional()
  content?: string
}
