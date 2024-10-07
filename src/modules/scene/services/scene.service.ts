import { Injectable } from '@nestjs/common'

import { CreateSceneSettingsDto } from '../dtos/scene-dto/create-scene-settings.dto'
import { UpdateSceneSettingsDto } from '../dtos/scene-dto/update-scene-settings.dto'

// * Importar Recursos de la Escena
import { CameraSettingsService } from '../resources/camera-settings.resource'
import { GridSettingsService } from '../resources/grid-settings.resource'
import { ModelSettingsService } from '../resources/model-settings.resource'
import { TransformationsSettingsService } from '../resources/transformation-settings.resource'

// * Importart Esquema de Ajustes de Escena
import { GridSettings } from '../schemas/grid-settings.schema'

import { SceneSettingsService } from '../resources/scene-settings.resource'

import { ModelSettings } from '../schemas/model-settings.schema'
import { CameraSettings } from '../schemas/camera-settings.schema'
import { TransformationsSettings } from '../schemas/transformations-settings.schema'
import { SceneSettings } from '../schemas/scene-settings.schema'

@Injectable()
export class SceneService {
  constructor(
    private readonly modelSettings: ModelSettingsService,
    private readonly cameraSettings: CameraSettingsService,
    private readonly transformationSettings: TransformationsSettingsService,
    private readonly gridSettings: GridSettingsService,
    private readonly sceneSettings: SceneSettingsService
  ) {}

  // Crear un nuevo ajuste de escena utilizando el DTO combinado
  async createDefault(createSceneSettingsDto: CreateSceneSettingsDto) {
    // TODO: Implementar Transacciones

    const createdGridSettings: GridSettings = await this.gridSettings.create(
      createSceneSettingsDto.gridSettings
    )

    const createdModelSettings: ModelSettings = await this.modelSettings.create(
      createSceneSettingsDto.modelSettings
    )
    const createdCameraSettings: CameraSettings =
      await this.cameraSettings.create(createSceneSettingsDto.cameraSettings)
    const createdTransformationSettings: TransformationsSettings =
      await this.transformationSettings.create(
        createSceneSettingsDto.transformationsSettings
      )

    const sceneSettings = this.sceneSettings.create({
      gridSettings: createdGridSettings,
      modelSettings: createdModelSettings,
      cameraSettings: createdCameraSettings,
      transformationsSettings: createdTransformationSettings
    })

    return sceneSettings
  }

  // Obtener todos los ajustes de escena
  async findAll(): Promise<SceneSettings[]> {
    return await this.sceneSettings.findAll()
  }

  // Obtener un ajuste de escena por su ID
  async findOne(id: string): Promise<SceneSettings> {
    return await this.sceneSettings.findOne(id)
  }

  // // Actualizar un ajuste de escena por su ID
  // async update(
  //   id: string,
  //   updateSceneSettingsDto: UpdateSceneSettingsDto
  // ): Promise<GridSettings> {
  //   const updatedGridSetting = await this.gridSettingsModel
  //     .findByIdAndUpdate(id, updateSceneSettingsDto.gridSettings, { new: true })
  //     .exec()
  //   if (!updatedGridSetting) {
  //     throw new NotFoundException(`Scene setting with ID ${id} not found`)
  //   }
  //   // Puedes agregar lógica aquí para actualizar otros aspectos de la escena
  //   return updatedGridSetting
  // }

  // // Eliminar un ajuste de escena por su ID
  // async remove(id: string): Promise<GridSettings> {
  //   const deletedGridSetting = await this.gridSettingsModel
  //     .findByIdAndDelete(id)
  //     .exec()
  //   if (!deletedGridSetting) {
  //     throw new NotFoundException(`Scene setting with ID ${id} not found`)
  //   }
  //   // Aquí podrías agregar lógica para eliminar otros elementos relacionados con la escena
  //   return deletedGridSetting
  // }
}
