import { IsOptional, IsString, IsMongoId } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateGltfFileDto {
  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    description: 'ID del modelo de artículo',
    example: '60d2f77bcf86cd799439012'
  })
  model_id?: string

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Ruta del archivo GLTF',
    example: '/path/to/model.gltf'
  })
  file_path?: string
}
