import { ApiProperty } from '@nestjs/swagger'
import { UpdateCameraSettingsDto } from './camera-dto/update-camera-settings.dto'
import { UpdateGridSettingsDto } from './grid-dto/update-grid-settings.dto'
import { UpdateModelSettingsDto } from './model-dto/update-model-settings.dto'
import { UpdateTransformationsSettingsDto } from './transformation-dto/update-transformations-settings.dto'
import { IsOptional } from 'class-validator'

export class PatchSceneSettingsDto {
  @ApiProperty({
    description: 'Camera settings for the scene',
    type: UpdateCameraSettingsDto
  })
  @IsOptional()
  cameraSettings?: UpdateCameraSettingsDto

  @ApiProperty({
    description: 'Grid settings for the scene',
    type: UpdateGridSettingsDto
  })
  @IsOptional()
  gridSettings?: UpdateGridSettingsDto

  @ApiProperty({
    description: 'Model settings for the scene',
    type: UpdateModelSettingsDto
  })
  @IsOptional()
  modelSettings?: UpdateModelSettingsDto

  @ApiProperty({
    description: 'Transformations settings for the scene',
    type: UpdateTransformationsSettingsDto
  })
  @IsOptional()
  transformationsSettings?: UpdateTransformationsSettingsDto
}
