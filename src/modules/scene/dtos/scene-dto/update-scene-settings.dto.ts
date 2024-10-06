import { ApiProperty } from '@nestjs/swagger'
import { UpdateCameraSettingsDto } from '../camera-dto/update-camera-settings.dto'
import { UpdateGridSettingsDto } from '../grid-dto/update-grid-settings.dto'
import { UpdateModelSettingsDto } from '../model-dto/update-model-settings.dto'
import { UpdateTransformationsSettingsDto } from '../transformation-dto/update-transformations-settings.dto'

export class UpdateSceneSettingsDto {
  @ApiProperty({ description: 'Camera settings for the scene' })
  cameraSettings: UpdateCameraSettingsDto

  @ApiProperty({ description: 'Grid settings for the scene' })
  gridSettings: UpdateGridSettingsDto

  @ApiProperty({ description: 'Model settings for the scene' })
  modelSettings: UpdateModelSettingsDto

  @ApiProperty({ description: 'Transformations settings for the scene' })
  transformationsSettings: UpdateTransformationsSettingsDto
}
