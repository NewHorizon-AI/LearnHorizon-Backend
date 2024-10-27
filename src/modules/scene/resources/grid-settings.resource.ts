import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { GridSettings } from '../schemas/grid-settings.schema'
import { CreateGridSettingsDto } from '../dtos/grid-dto/create-grid-settings.dto'
import { UpdateGridSettingsDto } from '../dtos/grid-dto/update-grid-settings.dto'

@Injectable()
export class GridSettingsService {
  constructor(
    @InjectModel(GridSettings.name)
    private gridSettingsModel: Model<GridSettings>
  ) {}

  // Crear un nuevo ajuste de cuadrícula
  async create(
    createGridSettingsDto: CreateGridSettingsDto
  ): Promise<GridSettings> {
    const createdGridSettings = new this.gridSettingsModel(
      createGridSettingsDto
    )
    return createdGridSettings.save()
  }

  async createDefault(): Promise<GridSettings> {
    const defaultGridSettings = new this.gridSettingsModel()
    return defaultGridSettings.save()
  }

  // Obtener todos los ajustes de cuadrícula
  async findAll(): Promise<GridSettings[]> {
    return this.gridSettingsModel.find().exec()
  }

  // Obtener un ajuste de cuadrícula por su ID
  async findOne(id: string): Promise<GridSettings> {
    const gridSetting = await this.gridSettingsModel.findById(id).exec()
    if (!gridSetting) {
      throw new NotFoundException(`GridSetting with ID ${id} not found`)
    }
    return gridSetting
  }

  // Actualizar un ajuste de cuadrícula por su ID
  async update(
    id: string,
    updateGridSettingsDto: UpdateGridSettingsDto
  ): Promise<GridSettings> {
    const updatedGridSetting = await this.gridSettingsModel
      .findByIdAndUpdate(id, updateGridSettingsDto, { new: true })
      .exec()
    if (!updatedGridSetting) {
      throw new NotFoundException(`GridSetting with ID ${id} not found`)
    }
    return updatedGridSetting
  }

  // Eliminar un ajuste de cuadrícula por su ID
  async remove(id: string): Promise<GridSettings> {
    const deletedGridSetting = await this.gridSettingsModel
      .findByIdAndDelete(id)
      .exec()
    if (!deletedGridSetting) {
      throw new NotFoundException(`GridSetting with ID ${id} not found`)
    }
    return deletedGridSetting
  }
}
