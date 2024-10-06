import { ApiProperty } from '@nestjs/swagger'

export class CreateCameraSettingsDto {
  @ApiProperty({ example: 60, description: 'Field of View of the camera' })
  fov: number

  @ApiProperty({ example: 0.5, description: 'Near clipping plane distance' })
  near: number

  @ApiProperty({ example: 500, description: 'Far clipping plane distance' })
  far: number

  @ApiProperty({
    example: { x: 10, y: 5, z: 15 },
    description: 'Position of the camera in 3D space'
  })
  position: {
    x: number
    y: number
    z: number
  }

  @ApiProperty({
    example: { x: 0, y: 0, z: 0 },
    description: 'LookAt vector for camera orientation'
  })
  lookAt: {
    x: number
    y: number
    z: number
  }

  @ApiProperty({
    example: { x: 0, y: 0, z: 0 },
    description: 'Rotation of the camera in 3D space'
  })
  rotation: {
    x: number
    y: number
    z: number
  }

  @ApiProperty({
    example: 'perspective',
    description: 'Type of the camera (e.g., perspective, orthographic)'
  })
  cameraType: string
}
