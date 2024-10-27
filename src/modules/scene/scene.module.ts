import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

// * (1) Importar Esquemas
import {
  CameraSettings,
  CameraSettingsSchema
} from './schemas/camera-settings.schema'
import {
  GridSettings,
  GridSettingsSchema
} from './schemas/grid-settings.schema'
import {
  TransformationsSettings,
  TransformationsSettingsSchema
} from './schemas/transformations-settings.schema'
import {
  ModelSettings,
  ModelSettingsSchema
} from './schemas/model-settings.schema'
import {
  SceneSettings,
  SceneSettingsSchema
} from './schemas/scene-settings.schema'

// * (2) Importar Controladores
import { SceneSettingsController } from './controllers/scene.controller'

// * (3) Importar Recursos
import { CameraSettingsService } from './resources/camera-settings.resource'
import { GridSettingsService } from './resources/grid-settings.resource'
import { ModelSettingsService } from './resources/model-settings.resource'
import { TransformationsSettingsService } from './resources/transformation-settings.resource'
import { SceneSettingsService } from './resources/scene-settings.resource'

// * (4) Importar Servicios
import { SceneService } from './services/scene.service'

import { ArticleModulev2 } from '../articles/article.module'

// * Importar Modulos
// import { UploadModule } from 'src/modules/upload/upload.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CameraSettings.name,
        schema: CameraSettingsSchema
      },
      {
        name: GridSettings.name,
        schema: GridSettingsSchema
      },
      {
        name: TransformationsSettings.name,
        schema: TransformationsSettingsSchema
      },
      {
        name: ModelSettings.name,
        schema: ModelSettingsSchema
      },
      {
        name: SceneSettings.name,
        schema: SceneSettingsSchema
      }
    ]),
    forwardRef(() => ArticleModulev2)
  ],
  controllers: [SceneSettingsController],
  providers: [
    SceneService,
    CameraSettingsService,
    GridSettingsService,
    ModelSettingsService,
    TransformationsSettingsService,
    SceneSettingsService
  ],
  exports: [
    MongooseModule,
    SceneService,
    CameraSettingsService,
    GridSettingsService,
    ModelSettingsService,
    TransformationsSettingsService,
    SceneSettingsService
  ]
})
export class SceneModule {}
