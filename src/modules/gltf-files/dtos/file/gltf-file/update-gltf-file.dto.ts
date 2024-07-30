import { IsOptional, IsString, IsMongoId, IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateGltfFileDto {
  @ApiProperty({
    description: 'ID del modelo de artículo',
    example: '60d2f77bcf86cd799439012'
  })
  @IsMongoId()
  @IsOptional()
  readonly article_id?: string

  @ApiProperty({
    description: 'Ruta del archivo GLTF',
    example: '/path/to/model.gltf'
  })
  @IsString()
  @IsOptional()
  readonly path?: string

  @ApiProperty({
    description: 'Nombre original del archivo GLTF',
    example: 'model.gltf'
  })
  @IsString()
  @IsOptional()
  readonly originalName?: string

  @ApiProperty({
    description: 'Tamaño del archivo en bytes',
    example: 123456
  })
  @IsNumber()
  @IsOptional()
  readonly size?: number

  @ApiProperty({
    description: 'Tipo MIME del archivo',
    example: 'model/gltf+json'
  })
  @IsString()
  @IsOptional()
  readonly mimetype?: string
}
