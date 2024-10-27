import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

@Schema()
export class ModelSettings extends Document {
  @ApiProperty({
    example: true,
    description: 'Defines if the setting is visible or not'
  })
  @Prop({ default: true })
  visible: boolean
}

export const ModelSettingsSchema = SchemaFactory.createForClass(ModelSettings)
