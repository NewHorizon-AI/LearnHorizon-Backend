import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

@Schema()
export class CameraSettings extends Document {
  @ApiProperty({ example: 60, description: 'Field of View of the camera' })
  @Prop({ required: true })
  fov: number

  @ApiProperty({ example: 0.5, description: 'Near clipping plane distance' })
  @Prop({ required: true })
  near: number

  @ApiProperty({ example: 500, description: 'Far clipping plane distance' })
  @Prop({ required: true })
  far: number

  @ApiProperty({
    example: { x: 10, y: 5, z: 15 },
    description: 'Position of the camera in 3D space',
    type: Object
  })
  @Prop({ required: true, type: Object })
  position: {
    x: number
    y: number
    z: number
  }

  @ApiProperty({
    example: { x: 0, y: 0, z: 0 },
    description: 'LookAt vector for camera orientation',
    type: Object
  })
  @Prop({ required: true, type: Object })
  lookAt: {
    x: number
    y: number
    z: number
  }

  @ApiProperty({
    example: { x: 0, y: 0, z: 0 },
    description: 'Rotation of the camera in 3D space',
    type: Object
  })
  @Prop({ required: true, type: Object })
  rotation: {
    x: number
    y: number
    z: number
  }

  @ApiProperty({
    example: 'perspective',
    description: 'Type of the camera (e.g., perspective, orthographic)'
  })
  @Prop({ required: true })
  cameraType: string
}

export const CameraSettingsSchema = SchemaFactory.createForClass(CameraSettings)
