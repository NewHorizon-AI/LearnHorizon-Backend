import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { CameraSettings } from './camera-settings.schema'
import { GridSettings } from './grid-settings.schema'
import { ModelSettings } from './model-settings.schema'
import { TransformationsSettings } from './transformations-settings.schema'

@Schema()
export class SceneSettings extends Document {
  @Prop({ type: Types.ObjectId, ref: CameraSettings.name })
  cameraSettings: CameraSettings

  @Prop({ type: Types.ObjectId, ref: GridSettings.name })
  gridSettings: GridSettings

  @Prop({ type: Types.ObjectId, ref: ModelSettings.name })
  modelSettings: ModelSettings

  @Prop({ type: Types.ObjectId, ref: TransformationsSettings.name })
  transformationsSettings: TransformationsSettings
}

export const SceneSettingsSchema = SchemaFactory.createForClass(SceneSettings)
