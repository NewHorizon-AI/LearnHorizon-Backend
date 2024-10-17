import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { SceneSettings } from '../schemas/scene-settings.schema'

import { UpdateSceneSettingsDto } from '../dtos/scene-dto/update-scene-settings.dto'

import { SceneSettingsDto } from '../dtos/scene-dto/scene-settings.dto'

@Injectable()
export class SceneSettingsService {
  constructor(
    @InjectModel(SceneSettings.name)
    private sceneSettingsModel: Model<SceneSettings>
  ) {}

  // Crear un nuevo ajuste de escena
  async create(sceneSettingsDto: SceneSettingsDto): Promise<SceneSettings> {
    const createdSceneSettings = new this.sceneSettingsModel(sceneSettingsDto)
    return createdSceneSettings.save()
  }

  // Obtener todos los ajustes de escena
  async findAll(): Promise<SceneSettings[]> {
    return this.sceneSettingsModel
      .find()
      .populate(
        'cameraSettings gridSettings modelSettings transformationsSettings'
      )
      .exec()
  }

  // Obtener un ajuste de escena por su ID
  async findOne(id: string): Promise<SceneSettings> {
    const sceneSetting = await this.sceneSettingsModel
      .findById(id)
      .populate(
        'cameraSettings gridSettings modelSettings transformationsSettings'
      )
      .exec()

    if (!sceneSetting) {
      throw new NotFoundException(`SceneSetting with ID ${id} not found`)
    }
    return sceneSetting
  }

  // Actualizar un ajuste de escena por su ID
  async update(
    id: string,
    updateSceneSettingsDto: UpdateSceneSettingsDto
  ): Promise<SceneSettings> {
    const updatedSceneSetting = await this.sceneSettingsModel
      .findByIdAndUpdate(id, updateSceneSettingsDto, { new: true })
      .exec()

    if (!updatedSceneSetting) {
      throw new NotFoundException(`SceneSetting with ID ${id} not found`)
    }
    return updatedSceneSetting
  }

  // Eliminar un ajuste de escena por su ID
  async remove(id: string): Promise<SceneSettings> {
    const deletedSceneSetting = await this.sceneSettingsModel
      .findByIdAndDelete(id)
      .exec()

    if (!deletedSceneSetting) {
      throw new NotFoundException(`SceneSetting with ID ${id} not found`)
    }
    return deletedSceneSetting
  }
}
