import { IsString, IsNotEmpty, IsMimeType } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateGltfUploadDto {
  @ApiProperty({
    description: 'Nombre del archivo',
    example: 'model.gltf'
  })
  @IsString()
  @IsNotEmpty()
  filename: string

  @ApiProperty({
    description: 'Ruta del archivo en el servidor',
    example: 'uploads/model.gltf'
  })
  @IsString()
  @IsNotEmpty()
  path: string

  @ApiProperty({
    description: 'Tipo MIME del archivo',
    example: 'model/gltf+json'
  })
  @IsMimeType()
  @IsNotEmpty()
  mimetype: string
}
