import { IsOptional, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

import { UpdateArticleModelEntryDto } from './file/article-model-entry/update-article-model-entry.dto'
import { UpdateGltfFileDto } from './file/gltf-file/update-gltf-file.dto'
import { UpdateModelTransformationDto } from './file/model-transformation/update-model-transformation.dto'

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
  @Type(() => UpdateGltfFileDto)
  @ApiProperty({
    description: 'Datos del archivo GLTF',
    type: UpdateGltfFileDto,
    required: false
  })
  gltfFile?: UpdateGltfFileDto

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
