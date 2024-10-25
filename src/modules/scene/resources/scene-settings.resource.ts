import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { SceneSettings } from '../schemas/scene-settings.schema'

import { CreateSceneSettingsDto } from '../dtos/scene-dto/create-scene-settings.dto'
import { PatchSceneSettingsDto } from '../dtos/patch-scene.dto'

@Injectable()
export class SceneSettingsService {
  constructor(
    @InjectModel(SceneSettings.name)
    private sceneSettingsModel: Model<SceneSettings>
  ) {}

  async create(
    createSceneSettingsDto?: CreateSceneSettingsDto
  ): Promise<SceneSettings> {
    const createdSceneSettings = new this.sceneSettingsModel(
      createSceneSettingsDto
    )
    return createdSceneSettings.save()
  }

  async findById(id: string): Promise<SceneSettings> {
    const sceneSettings = await this.sceneSettingsModel.findById(id).exec()
    if (!sceneSettings) {
      throw new NotFoundException(
        `La escena con el ID: ${id} no se ha encontrado`
      )
    }
    return sceneSettings
  }

  async findAll(): Promise<SceneSettings[]> {
    return this.sceneSettingsModel
      .find()
      .populate(
        'cameraSettings gridSettings modelSettings transformationsSettings'
      )
      .exec()
  }

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

  async update(
    id: string,
    sceneSettings: PatchSceneSettingsDto
  ): Promise<SceneSettings> {
    const updatedSceneSetting = await this.sceneSettingsModel
      .findByIdAndUpdate(id, sceneSettings, { new: true })
      .exec()
    if (!updatedSceneSetting) {
      throw new NotFoundException(`SceneSetting with ID ${id} not found`)
    }
    return updatedSceneSetting
  }
}
