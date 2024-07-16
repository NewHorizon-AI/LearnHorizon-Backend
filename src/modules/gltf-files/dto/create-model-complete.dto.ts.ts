import { IsNotEmpty, ValidateNested, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

import { CreateArticleModelEntryDto } from './file/article-model-entry/create-article-model-entry.dto'
import { CreateGltfFileDto } from './file/gltf-file/create-gltf-file.dto'
import { CreateModelTransformationDto } from './file/model-transformation/create-model-transformation.dto'

export class CreateModelCompleteDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateArticleModelEntryDto)
  @ApiProperty({
    description: 'Datos del modelo del artículo',
    type: CreateArticleModelEntryDto
  })
  articleModelEntry: CreateArticleModelEntryDto

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateGltfFileDto)
  @ApiProperty({
    description: 'Datos del archivo GLTF',
    type: CreateGltfFileDto,
    required: false
  })
  gltfFile?: CreateGltfFileDto

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateModelTransformationDto)
  @ApiProperty({
    description: 'Datos de la transformación del modelo',
    type: CreateModelTransformationDto,
    required: false
  })
  modelTransformation?: CreateModelTransformationDto
}
