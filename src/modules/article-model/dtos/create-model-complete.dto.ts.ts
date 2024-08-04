import { IsNotEmpty, ValidateNested, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

import { CreateArticleModelDto } from './article-model/create-article-model.dto'
import { CreateArticleModelTransformationDto } from './article-model-transformation/create-article-model-transformation.dto'

// Importar Dto externo
// import { CreateGltfUploadDto } from 'src/modules/upload-files/dtos/create-upload.dto'

export class CreateModelCompleteDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateArticleModelDto)
  @ApiProperty({
    description: 'Datos del modelo del artículo',
    type: CreateArticleModelDto
  })
  articleModel: CreateArticleModelDto

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateArticleModelTransformationDto)
  @ApiProperty({
    description: 'Datos de la transformación del modelo',
    type: CreateArticleModelTransformationDto,
    required: false
  })
  articleModelTransformation?: CreateArticleModelTransformationDto

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
