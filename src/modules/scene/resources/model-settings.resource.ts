import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { ModelSettings } from '../schemas/model-settings.schema'
import { CreateModelSettingsDto } from '../dtos/model-dto/create-model-settings.dto'
import { UpdateModelSettingsDto } from '../dtos/model-dto/update-model-settings.dto'

@Injectable()
export class ModelSettingsService {
  constructor(
    @InjectModel(ModelSettings.name)
    private modelSettingsModel: Model<ModelSettings>
  ) {}

  // Crear un nuevo ajuste de modelo
  async create(
    createModelSettingsDto: CreateModelSettingsDto
  ): Promise<ModelSettings> {
    const createdModelSettings = new this.modelSettingsModel(
      createModelSettingsDto
    )
    return createdModelSettings.save()
  }

  async createDefault(): Promise<ModelSettings> {
    const defaultModelSettings = new this.modelSettingsModel({})
    return defaultModelSettings.save()
  }

  // Obtener todos los ajustes de modelo
  async findAll(): Promise<ModelSettings[]> {
    return this.modelSettingsModel.find().exec()
  }

  // Obtener un ajuste de modelo por su ID
  async findOne(id: string): Promise<ModelSettings> {
    const modelSetting = await this.modelSettingsModel.findById(id).exec()
    if (!modelSetting) {
      throw new NotFoundException(`ModelSetting with ID ${id} not found`)
    }
    return modelSetting
  }

  // Actualizar un ajuste de modelo por su ID
  async update(
    id: string,
    updateModelSettingsDto: UpdateModelSettingsDto
  ): Promise<ModelSettings> {
    const updatedModelSetting = await this.modelSettingsModel
      .findByIdAndUpdate(id, updateModelSettingsDto, { new: true })
      .exec()
    if (!updatedModelSetting) {
      throw new NotFoundException(`ModelSetting with ID ${id} not found`)
    }
    return updatedModelSetting
  }

  // Eliminar un ajuste de modelo por su ID
  async remove(id: string): Promise<ModelSettings> {
    const deletedModelSetting = await this.modelSettingsModel
      .findByIdAndDelete(id)
      .exec()
    if (!deletedModelSetting) {
      throw new NotFoundException(`ModelSetting with ID ${id} not found`)
    }
    return deletedModelSetting
  }
}
