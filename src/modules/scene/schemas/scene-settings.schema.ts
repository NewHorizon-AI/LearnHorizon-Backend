import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { CameraSettings, CameraSettingsSchema } from './camera-settings.schema'
import { GridSettings, GridSettingsSchema } from './grid-settings.schema'
import { ModelSettings, ModelSettingsSchema } from './model-settings.schema'
import {
  TransformationsSettings,
  TransformationsSettingsSchema
} from './transformations-settings.schema'

@Schema()
export class SceneSettings extends Document {
  // * Todos los subdocumentos embebidos directamente en SceneSettings con valores por defecto
  @Prop({ type: CameraSettingsSchema, default: () => ({}) })
  cameraSettings: CameraSettings

  @Prop({ type: GridSettingsSchema, default: () => ({}) })
  gridSettings: GridSettings

  @Prop({ type: ModelSettingsSchema, default: () => ({}) })
  modelSettings: ModelSettings

  @Prop({
    type: TransformationsSettingsSchema,
    default: () => ({})
  })
  transformationsSettings: TransformationsSettings
}

export const SceneSettingsSchema = SchemaFactory.createForClass(SceneSettings)
