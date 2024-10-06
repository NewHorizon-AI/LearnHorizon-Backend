import { PartialType } from '@nestjs/swagger'
import { CreateModelSettingsDto } from './create-model-settings.dto'

export class UpdateModelSettingsDto extends PartialType(
  CreateModelSettingsDto
) {}
