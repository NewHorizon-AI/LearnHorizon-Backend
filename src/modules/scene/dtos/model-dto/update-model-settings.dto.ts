import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsOptional } from 'class-validator'

export class UpdateModelSettingsDto {
  @ApiProperty({
    example: true,
    description: 'Defines if the setting is visible or not'
  })
  @IsBoolean()
  @IsOptional()
  visible?: boolean
}
