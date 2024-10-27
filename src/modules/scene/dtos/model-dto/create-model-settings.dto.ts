import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean } from 'class-validator'

export class CreateModelSettingsDto {
  @ApiProperty({
    example: true,
    description: 'Defines if the setting is visible or not'
  })
  @IsBoolean()
  visible: boolean
}
