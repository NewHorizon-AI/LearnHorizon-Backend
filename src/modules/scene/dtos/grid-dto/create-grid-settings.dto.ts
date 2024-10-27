import { ApiProperty } from '@nestjs/swagger'
import { IsHexColor, IsNumber, IsOptional } from 'class-validator'

export class CreateGridSettingsDto {
  @ApiProperty({
    example: '#ffffff',
    description: 'Background color of the grid'
  })
  @IsOptional()
  @IsHexColor()
  backgroundColor?: string

  @ApiProperty({
    example: 20,
    description: 'Size of the grid'
  })
  @IsOptional()
  @IsNumber()
  size: number

  @ApiProperty({
    example: 15,
    description: 'Number of divisions in the grid'
  })
  @IsOptional()
  @IsNumber()
  divisions: number

  @ApiProperty({
    example: true,
    description: 'Defines whether the grid is visible or not'
  })
  @IsNumber()
  gridVisible: boolean

  @ApiProperty({
    example: 1.0,
    description: 'Opacity level of the grid, from 0 to 1'
  })
  @IsNumber()
  gridOpacity: number
}
