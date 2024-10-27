import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

@Schema()
export class TransformationsSettings extends Document {
  @Prop({ type: Array, default: [1, 1, 1] })
  @ApiProperty({
    description: 'Escala del modelo',
    example: [1, 1, 1]
  })
  scale: [number, number, number]

  @Prop({ type: Array, default: [0, 0, 0] })
  @ApiProperty({
    description: 'Rotación del modelo',
    example: [0, 0, 0]
  })
  rotation: [number, number, number]

  @Prop({ type: Array, default: [0, 0, 0] })
  @ApiProperty({
    description: 'Posición del modelo',
    example: [0, 0, 0]
  })
  position: [number, number, number]
}

export const TransformationsSettingsSchema = SchemaFactory.createForClass(
  TransformationsSettings
)
