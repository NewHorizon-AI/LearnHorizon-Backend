import { ApiProperty } from '@nestjs/swagger'
import { CreateCameraSettingsDto } from '../camera-dto/create-camera-settings.dto'
import { CreateGridSettingsDto } from '../grid-dto/create-grid-settings.dto'
import { CreateModelSettingsDto } from '../model-dto/create-model-settings.dto'
import { CreateTransformationsSettingsDto } from '../transformation-dto/create-transformations-settings.dto'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateSceneSettingsDto {
  @ApiProperty({
    example: '670d81e23c090bdc343c9eba',
    description: 'ID del articulo'
  })
  @IsString()
  @IsNotEmpty()
  articleId: string

  @ApiProperty({ description: 'Camera settings for the scene' })
  cameraSettings: CreateCameraSettingsDto

  @ApiProperty({ description: 'Grid settings for the scene' })
  gridSettings: CreateGridSettingsDto

  @ApiProperty({ description: 'Model settings for the scene' })
  modelSettings: CreateModelSettingsDto

  @ApiProperty({ description: 'Transformations settings for the scene' })
  transformationsSettings: CreateTransformationsSettingsDto
}
