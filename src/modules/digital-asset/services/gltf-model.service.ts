import { Injectable } from '@nestjs/common'
import { GltfModelAssetResourceService } from '../resources/gltf-model-asset-resource.service'
import { CreateGltfModelAssetDto } from '../dtos/gltf-model-asset/create-gltf-model-asset.dto'
import { UpdateGltfModelAssetDto } from '../dtos/gltf-model-asset/update-gltf-model-asset.dto'
import { Express } from 'express'
import { GltfModelAsset } from '../schemas/gltf-model-asset.schema'

@Injectable()
export class GltfModelService {
  constructor(
    private readonly gltfModelAssetResourceService: GltfModelAssetResourceService
  ) {}

  // Crear un nuevo modelo GLTF
  async createModel(
    createGltfModelAssetDto: CreateGltfModelAssetDto
  ): Promise<GltfModelAsset> {
    return this.gltfModelAssetResourceService.create(createGltfModelAssetDto)
  }

  // Crear un nuevo modelo GLTF desde un archivo
  async createModelFromFile(
    file: Express.Multer.File
  ): Promise<GltfModelAsset> {
    return this.gltfModelAssetResourceService.createFromFile(file)
  }

  // Obtener todos los modelos GLTF
  async getAllModels(): Promise<GltfModelAsset[]> {
    return this.gltfModelAssetResourceService.findAll()
  }

  // Obtener un modelo GLTF por ID
  async getModelById(id: string): Promise<GltfModelAsset> {
    return this.gltfModelAssetResourceService.findOne(id)
  }

  // Actualizar un modelo GLTF por ID
  async updateModel(
    id: string,
    updateGltfModelAssetDto: UpdateGltfModelAssetDto
  ): Promise<GltfModelAsset> {
    return this.gltfModelAssetResourceService.update(
      id,
      updateGltfModelAssetDto
    )
  }

  // Eliminar un modelo GLTF por ID
  async deleteModel(id: string): Promise<GltfModelAsset> {
    return this.gltfModelAssetResourceService.remove(id)
  }
}
