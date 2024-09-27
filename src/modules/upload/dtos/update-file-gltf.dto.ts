import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { Types } from 'mongoose'
import { CreateFileGltfDto } from './create-file-gltf.dto'

export class UpdateFileGltfDto extends PartialType(CreateFileGltfDto) {
  @ApiProperty({
    description: 'Nombre del archivo',
    example: 'model.gltf',
    required: false
  })
  @IsOptional()
  @IsString()
  filename?: string

  @ApiProperty({
    description: 'Ruta del archivo en el servidor',
    example: 'uploads/model.gltf',
    required: false
  })
  @IsOptional()
  @IsString()
  path?: string

  @ApiProperty({
    description: 'Tipo MIME del archivo',
    example: 'model/gltf+json',
    required: false
  })
  @IsOptional()
  @IsString()
  mimetype?: string

  @ApiProperty({
    description: 'ID del artículo',
    example: '60d2f77bcf86cd799439012',
    required: false
  })
  @IsOptional()
  article_model_id?: Types.ObjectId
}
