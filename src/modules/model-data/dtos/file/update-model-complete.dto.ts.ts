import { IsOptional, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

import { UpdateArticleModelEntryDto } from './article-model-entry/update-article-model-entry.dto'
import { UpdateGltfUploadDto } from 'src/modules/upload-files/dtos/update-gltf-upload.dto'
import { UpdateModelTransformationDto } from './model-transformation/update-model-transformation.dto'

export class UpdateModelCompleteDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateArticleModelEntryDto)
  @ApiProperty({
    description: 'Datos del modelo del artículo',
    type: UpdateArticleModelEntryDto,
    required: false
  })
  articleModelEntry?: UpdateArticleModelEntryDto

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateGltfUploadDto)
  @ApiProperty({
    description: 'Datos del archivo GLTF',
    type: UpdateGltfUploadDto,
    required: false
  })
  gltfFile?: UpdateGltfUploadDto

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateModelTransformationDto)
  @ApiProperty({
    description: 'Datos de la transformación del modelo',
    type: UpdateModelTransformationDto,
    required: false
  })
  modelTransformation?: UpdateModelTransformationDto
}
