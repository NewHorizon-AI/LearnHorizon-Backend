import { PartialType } from '@nestjs/swagger'
import { CreateGridSettingsDto } from './create-grid-settings.dto'

export class UpdateGridSettingsDto extends PartialType(CreateGridSettingsDto) {}
