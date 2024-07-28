import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

// Importacion de Dtos
import { CreateGltfFileDto } from 'src/modules/gltf-files/dtos/file/gltf-file/create-gltf-file.dto'
import { UpdateGltfFileDto } from 'src/modules/gltf-files/dtos/file/gltf-file/update-gltf-file.dto'

// Importacion de Esquemas
import { GltfFile } from '../../../schemas/gltf-file.schema'

@Injectable()
export class GltfFileService {
  constructor(
    @InjectModel(GltfFile.name) private gltfFileModel: Model<GltfFile>
  ) {}

  async createGltfFile(
    createGltfFileDto: CreateGltfFileDto
  ): Promise<GltfFile> {
    const newGltfFile = new this.gltfFileModel(createGltfFileDto)
    return newGltfFile.save()
  }

  async findAllGltfFiles(): Promise<GltfFile[]> {
    return this.gltfFileModel.find().exec()
  }

  async findGltfFileById(id: string): Promise<GltfFile> {
    const gltfFile = await this.gltfFileModel.findById(id).exec()
    if (!gltfFile) {
      throw new NotFoundException(`GltfFile with ID ${id} not found`)
    }
    return gltfFile
  }

  async updateGltfFile(
    id: string,
    updateGltfFileDto: UpdateGltfFileDto
  ): Promise<GltfFile> {
    const updatedGltfFile = await this.gltfFileModel
      .findByIdAndUpdate(id, updateGltfFileDto, { new: true })
      .exec()
    if (!updatedGltfFile) {
      throw new NotFoundException(`GltfFile with ID ${id} not found`)
    }
    return updatedGltfFile
  }

  async deleteGltfFile(id: string): Promise<GltfFile> {
    const deletedGltfFile = await this.gltfFileModel
      .findByIdAndDelete(id)
      .exec()
    if (!deletedGltfFile) {
      throw new NotFoundException(`GltfFile with ID ${id} not found`)
    }
    return deletedGltfFile
  }
}
