import { PartialType } from '@nestjs/swagger'
import { CreateTransformationsSettingsDto } from './create-transformations-settings.dto'

export class UpdateTransformationsSettingsDto extends PartialType(
  CreateTransformationsSettingsDto
) {}
