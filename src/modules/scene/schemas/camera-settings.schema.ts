import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

@Schema()
export class CameraSettings extends Document {
  @ApiProperty({ example: 60, description: 'Field of View of the camera' })
  @Prop({ default: 60 })
  fov: number

  @ApiProperty({ example: 0.5, description: 'Near clipping plane distance' })
  @Prop({ default: 0.5 })
  near: number

  @ApiProperty({ example: 500, description: 'Far clipping plane distance' })
  @Prop({ default: 500 })
  far: number

  @ApiProperty({
    example: [10, 5, 15],
    description: 'Position of the camera in 3D space',
    type: Array
  })
  @Prop({ type: Array, default: [0, 0, 0] })
  position: [number, number, number]

  @ApiProperty({
    example: [0, 0, 0],
    description: 'LookAt vector for camera orientation',
    type: Array
  })
  @Prop({ type: Array, default: [0, 0, 0] })
  lookAt: [number, number, number]

  @ApiProperty({
    example: [0, 0, 0],
    description: 'Rotation of the camera in 3D space',
    type: Array
  })
  @Prop({ type: Array, default: [0, 0, 0] })
  rotation: [number, number, number]

  @ApiProperty({
    example: 'perspective',
    description: 'Type of the camera (e.g., perspective, orthographic)'
  })
  @Prop({ default: 'perspective' })
  cameraType: string
}

export const CameraSettingsSchema = SchemaFactory.createForClass(CameraSettings)
