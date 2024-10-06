import { GridSettings } from './../schemas/grid-settings.schema'
import { TransformationsSettings } from './../schemas/transformations-settings.schema'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreateSceneSettingsDto } from '../dtos/scene-dto/create-scene-settings.dto'
import { UpdateSceneSettingsDto } from '../dtos/scene-dto/update-scene-settings.dto'

// * Importar Recursos de la Escena
import { CameraSettingsService } from '../resources/camera-settings.resource'
import { GridSettingsService } from '../resources/grid-settings.resource'
import { ModelSettingsService } from '../resources/model-settings.resource'
import { TransformationsSettingsService } from '../resources/transformation-settings.resource'

// * Importar los mapper necesarios
import { mapModelToUpdateSceneSettingsDto } from '../mapper/scene.map'

@Injectable()
export class SceneService {
  constructor(
    private readonly modelSettings: ModelSettingsService,
    private readonly cameraSettings: CameraSettingsService,
    private readonly transformationSettings: TransformationsSettingsService,
    private readonly gridSettings: GridSettingsService
  ) {}

  // ? Crear un nuevo ajuste de escena utilizando el DTO combinado
  async createDefault(createSceneSettingsDto: CreateSceneSettingsDto) {
    this.gridSettings.create(createSceneSettingsDto.gridSettings)
    this.modelSettings.create(createSceneSettingsDto.modelSettings)
    this.cameraSettings.create(createSceneSettingsDto.cameraSettings)
    this.transformationSettings.create(
      createSceneSettingsDto.transformationsSettings
    )
  }

  // // Obtener todos los ajustes de escena
  // async findAll(): Promise<GridSettings[]> {
  //   // Aquí solo estoy usando gridSettings, pero si tienes otros esquemas deberías hacer consultas adicionales para otros aspectos de la escena
  //   return this.gridSettingsModel.find().exec()
  // }

  // ? Obtener un ajuste de escena por su ID
  async findOne(id: string): Promise<UpdateSceneSettingsDto> {
    const modelSettings = await this.modelSettings.findOne(id)

    return mapModelToUpdateSceneSettingsDto(modelSettings)
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
