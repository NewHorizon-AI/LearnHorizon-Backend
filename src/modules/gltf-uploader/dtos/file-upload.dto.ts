import { ApiProperty } from '@nestjs/swagger'

export class FileUploadDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Archivo a subir'
  })
  file: any
}
