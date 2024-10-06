import { ApiProperty } from '@nestjs/swagger'
import { Matches } from 'class-validator'

export class CreateGridSettingsDto {
  @ApiProperty({
    example: '#ffffff',
    description: 'Background color of the grid'
  })
  backgroundColor: string

  @ApiProperty({
    example: 20,
    description: 'Size of the grid'
  })
  size: number

  @ApiProperty({
    example: 15,
    description: 'Number of divisions in the grid'
  })
  divisions: number

  @ApiProperty({
    example: 'XY',
    description: 'Axes to activate. Possible values: XY, XZ, YZ, XYZ, or none.'
  })
  @Matches(/^(XY|XZ|YZ|XYZ|none)$/, {
    message:
      'The activarEjes field must be one of the following: XY, XZ, YZ, XYZ, or none.'
  })
  activarEjes: string

  @ApiProperty({
    example: true,
    description: 'Defines whether the grid is visible or not'
  })
  gridVisible: boolean

  @ApiProperty({
    example: { X: '#ff0000', Y: '#00ff00', Z: '#0000ff' },
    description: 'Color configuration for the X, Y, and Z axes'
  })
  axisColors: {
    X: string
    Y: string
    Z: string
  }

  @ApiProperty({
    example: { x: 0, y: 0, z: 0 },
    description: 'Position of the grid in 3D space'
  })
  gridPosition: {
    x: number
    y: number
    z: number
  }

  @ApiProperty({
    example: { x: 0, y: 0, z: 0 },
    description: 'Rotation of the grid in 3D space'
  })
  gridRotation: {
    x: number
    y: number
    z: number
  }

  @ApiProperty({
    example: 1.0,
    description: 'Opacity level of the grid, from 0 to 1'
  })
  gridOpacity: number
}
