import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsNumber, IsMongoId } from 'class-validator'

export class CreateGltfFileDto {
  @ApiProperty({
    description: 'ID del modelo de artículo',
    example: '60d2f77bcf86cd799439012'
  })
  @IsMongoId()
  @IsNotEmpty()
  readonly article_id: string

  @ApiProperty({
    description: 'Ruta del archivo GLTF',
    example: '/path/to/model.gltf'
  })
  @IsString()
  @IsNotEmpty()
  readonly path: string

  @ApiProperty({
    description: 'Nombre original del archivo GLTF',
    example: 'model.gltf'
  })
  @IsString()
  @IsNotEmpty()
  readonly originalName: string

  @ApiProperty({
    description: 'Tamaño del archivo en bytes',
    example: 123456
  })
  @IsNumber()
  @IsNotEmpty()
  readonly size: number

  @ApiProperty({
    description: 'Tipo MIME del archivo',
    example: 'model/gltf+json'
  })
  @IsString()
  @IsNotEmpty()
  readonly mimetype: string
}
