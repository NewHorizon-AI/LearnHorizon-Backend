import { PartialType } from '@nestjs/swagger'
import { CreateCameraSettingsDto } from './create-camera-settings.dto'

export class UpdateCameraSettingsDto extends PartialType(
  CreateCameraSettingsDto
) {}
