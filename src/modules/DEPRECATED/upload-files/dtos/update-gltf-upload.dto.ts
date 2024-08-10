import { IsString, IsMimeType, IsOptional } from 'class-validator'
import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateGltfUploadDto } from './create-upload.dto' // Asegúrate de importar el DTO original

export class UpdateGltfUploadDto extends PartialType(CreateGltfUploadDto) {
  @ApiProperty({
    description: 'Nombre del archivo',
    example: 'model.gltf',
    required: false
  })
  @IsString()
  @IsOptional()
  filename?: string

  @ApiProperty({
    description: 'Ruta del archivo en el servidor',
    example: 'uploads/model.gltf',
    required: false
  })
  @IsString()
  @IsOptional()
  path?: string

  @ApiProperty({
    description: 'Tipo MIME del archivo',
    example: 'model/gltf+json',
    required: false
  })
  @IsMimeType()
  @IsOptional()
  mimetype?: string
}
