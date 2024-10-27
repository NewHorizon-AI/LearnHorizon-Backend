import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { TransformationsSettings } from '../schemas/transformations-settings.schema'
import { CreateTransformationsSettingsDto } from '../dtos/transformation-dto/create-transformations-settings.dto'
import { UpdateTransformationsSettingsDto } from '../dtos/transformation-dto/update-transformations-settings.dto'

@Injectable()
export class TransformationsSettingsService {
  constructor(
    @InjectModel(TransformationsSettings.name)
    private transformationsSettingsModel: Model<TransformationsSettings>
  ) {}

  // Crear un nuevo ajuste de transformación
  async create(
    createTransformationsSettingsDto: CreateTransformationsSettingsDto
  ): Promise<TransformationsSettings> {
    const createdTransformationsSettings =
      new this.transformationsSettingsModel(createTransformationsSettingsDto)
    return createdTransformationsSettings.save()
  }

  async createDefault(): Promise<TransformationsSettings> {
    const defaultTransformationsSettings =
      new this.transformationsSettingsModel()
    return defaultTransformationsSettings.save()
  }

  // Obtener todos los ajustes de transformación
  async findAll(): Promise<TransformationsSettings[]> {
    return this.transformationsSettingsModel.find().exec()
  }

  // Obtener un ajuste de transformación por su ID
  async findOne(id: string): Promise<TransformationsSettings> {
    const transformationsSetting = await this.transformationsSettingsModel
      .findById(id)
      .exec()
    if (!transformationsSetting) {
      throw new NotFoundException(
        `TransformationsSetting with ID ${id} not found`
      )
    }
    return transformationsSetting
  }

  // Actualizar un ajuste de transformación por su ID
  async update(
    id: string,
    updateTransformationsSettingsDto: UpdateTransformationsSettingsDto
  ): Promise<TransformationsSettings> {
    const updatedTransformationsSetting =
      await this.transformationsSettingsModel
        .findByIdAndUpdate(id, updateTransformationsSettingsDto, { new: true })
        .exec()
    if (!updatedTransformationsSetting) {
      throw new NotFoundException(
        `TransformationsSetting with ID ${id} not found`
      )
    }
    return updatedTransformationsSetting
  }

  // Eliminar un ajuste de transformación por su ID
  async remove(id: string): Promise<TransformationsSettings> {
    const deletedTransformationsSetting =
      await this.transformationsSettingsModel.findByIdAndDelete(id).exec()
    if (!deletedTransformationsSetting) {
      throw new NotFoundException(
        `TransformationsSetting with ID ${id} not found`
      )
    }
    return deletedTransformationsSetting
  }
}
