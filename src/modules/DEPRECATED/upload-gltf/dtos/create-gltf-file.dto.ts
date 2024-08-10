import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

import { Express } from 'express'

export class CreateArticleDto {
  @ApiProperty({
    description: 'Identificador del artículo',
    example: '12345-abcde'
  })
  @IsString()
  article_entry_id: string
}

export class FileUploadDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Archivo adjunto del artículo'
  })
  file: Express.Multer.File
}
