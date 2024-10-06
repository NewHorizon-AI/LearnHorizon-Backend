import { UpdateSceneSettingsDto } from '../dtos/scene-dto/update-scene-settings.dto'

import { UpdateCameraSettingsDto } from '../dtos/camera-dto/update-camera-settings.dto'
import { UpdateGridSettingsDto } from './../dtos/grid-dto/update-grid-settings.dto'
import { UpdateModelSettingsDto } from '../dtos/model-dto/update-model-settings.dto'
import { UpdateTransformationsSettingsDto } from '../dtos/transformation-dto/update-transformations-settings.dto'

export function mapModelToUpdateSceneSettingsDto(
  modelSettings?: UpdateModelSettingsDto,
  cameraSettings?: UpdateCameraSettingsDto,
  gridSettings?: UpdateGridSettingsDto,
  transformationsSettings?: UpdateTransformationsSettingsDto
): UpdateSceneSettingsDto {
  const updateSceneSettingsDto: UpdateSceneSettingsDto = {
    cameraSettings: cameraSettings ? { ...cameraSettings } : {},
    gridSettings: gridSettings ? { ...gridSettings } : {},
    modelSettings: modelSettings ? { ...modelSettings } : {},
    transformationsSettings: transformationsSettings
      ? { ...transformationsSettings }
      : {}
  }

  return updateSceneSettingsDto
}
