import {
  IsString,
  IsNotEmpty,
  IsMimeType,
  IsMongoId,
  IsOptional
} from 'class-validator'
import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateGltfUploadDto } from './create-upload.dto' // Asegúrate de importar el DTO original

export class UpdateGltfUploadDto extends PartialType(CreateGltfUploadDto) {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID del artículo',
    example: '60d2f77bcf86cd799439012'
  })
  article_entry_id: string

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
