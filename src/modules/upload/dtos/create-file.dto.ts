import { IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateFileDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Nombre del archivo',
    example: 'model.gltf',
    required: true
  })
  filename: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Ruta del archivo en el servidor',
    example: 'uploads/model.gltf',
    required: true
  })
  path: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Tipo MIME del archivo',
    example: 'model/gltf+json',
    required: true
  })
  mimetype: string
}
