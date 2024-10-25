import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CameraSettings } from '../schemas/camera-settings.schema'
import { CreateCameraSettingsDto } from '../dtos/camera-dto/create-camera-settings.dto'
import { UpdateCameraSettingsDto } from '../dtos/camera-dto/update-camera-settings.dto'

@Injectable()
export class CameraSettingsService {
  constructor(
    @InjectModel(CameraSettings.name)
    private cameraSettingsModel: Model<CameraSettings>
  ) {}

  // Crear un nuevo ajuste de cámara
  async create(
    createCameraSettingsDto: CreateCameraSettingsDto
  ): Promise<CameraSettings> {
    const createdCameraSettings = new this.cameraSettingsModel(
      createCameraSettingsDto
    )
    return createdCameraSettings.save()
  }

  async createDefault(): Promise<CameraSettings> {
    const defaultCameraSettings = new this.cameraSettingsModel()
    return defaultCameraSettings.save()
  }

  // Obtener todos los ajustes de cámara
  async findAll(): Promise<CameraSettings[]> {
    return this.cameraSettingsModel.find().exec()
  }

  // Obtener un ajuste de cámara por su ID
  async findOne(id: string): Promise<CameraSettings> {
    const cameraSetting = await this.cameraSettingsModel.findById(id).exec()
    if (!cameraSetting) {
      throw new NotFoundException(`CameraSetting with ID ${id} not found`)
    }
    return cameraSetting
  }

  // Actualizar un ajuste de cámara por su ID
  async update(
    id: string,
    updateCameraSettingsDto: UpdateCameraSettingsDto
  ): Promise<CameraSettings> {
    const updatedCameraSetting = await this.cameraSettingsModel
      .findByIdAndUpdate(id, updateCameraSettingsDto, { new: true })
      .exec()
    if (!updatedCameraSetting) {
      throw new NotFoundException(`CameraSetting with ID ${id} not found`)
    }
    return updatedCameraSetting
  }

  // Eliminar un ajuste de cámara por su ID
  async remove(id: string): Promise<CameraSettings> {
    const deletedCameraSetting = await this.cameraSettingsModel
      .findByIdAndDelete(id)
      .exec()
    if (!deletedCameraSetting) {
      throw new NotFoundException(`CameraSetting with ID ${id} not found`)
    }
    return deletedCameraSetting
  }
}
