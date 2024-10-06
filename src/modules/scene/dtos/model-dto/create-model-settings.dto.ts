import { ApiProperty } from '@nestjs/swagger'

export class CreateModelSettingsDto {
  @ApiProperty({
    example: true,
    description: 'Defines if the setting is visible or not'
  })
  visible: boolean
}
