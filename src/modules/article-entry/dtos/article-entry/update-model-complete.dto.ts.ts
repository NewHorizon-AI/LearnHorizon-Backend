import { IsOptional, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

import { UpdateModelTransformationDto } from './model-transformation/update-model-transformation.dto'

// Importar Dto externo
import { UpdateGltfUploadDto } from 'src/modules/upload-files/dtos/update-gltf-upload.dto'

export class UpdateArticleModelEntryDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateModelTransformationDto)
  @ApiProperty({
    description: 'Datos de la transformación del modelo',
    type: UpdateModelTransformationDto,
    required: false
  })
  modelTransformation?: UpdateModelTransformationDto

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateGltfUploadDto)
  @ApiProperty({
    description: 'Datos del archivo GLTF',
    type: UpdateGltfUploadDto,
    required: false
  })
  model?: UpdateGltfUploadDto
}
