import { ApiProperty } from '@nestjs/swagger'

import { Types } from 'mongoose'

export class SceneSettingsDto {
  @ApiProperty({ description: 'Camera settings for the scene' })
  cameraSettings: Types.ObjectId

  @ApiProperty({ description: 'Grid settings for the scene' })
  gridSettings: Types.ObjectId

  @ApiProperty({ description: 'Model settings for the scene' })
  modelSettings: Types.ObjectId

  @ApiProperty({ description: 'Transformations settings for the scene' })
  transformationsSettings: Types.ObjectId
}
