import { IsNotEmpty, ValidateNested, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

import { CreateArticleModelEntryDto } from './article-model-entry/create-article-model-entry.dto'
import { CreateModelTransformationDto } from './model-transformation/create-model-transformation.dto'

// Importar Dto externo
// import { CreateGltfUploadDto } from 'src/modules/upload-files/dtos/create-upload.dto'

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
  @Type(() => CreateModelTransformationDto)
  @ApiProperty({
    description: 'Datos de la transformación del modelo',
    type: CreateModelTransformationDto,
    required: false
  })
  modelTransformation?: CreateModelTransformationDto

  // @IsOptional()
  // @ValidateNested()
  // @Type(() => CreateGltfUploadDto)
  // @ApiProperty({
  //   description: 'Datos del archivo GLTF',
  //   type: CreateGltfUploadDto,
  //   required: false
  // })
  // model?: CreateGltfUploadDto
}
