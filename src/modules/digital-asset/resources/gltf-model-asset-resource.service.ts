import { Express } from 'express'
import * as crypto from 'crypto'
import * as fs from 'fs'

import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { GltfModelAsset } from '../schemas/gltf-model-asset.schema'
import { CreateGltfModelAssetDto } from '../dtos/gltf-model-asset/create-gltf-model-asset.dto'
import { UpdateGltfModelAssetDto } from '../dtos/gltf-model-asset/update-gltf-model-asset.dto'

@Injectable()
export class GltfModelAssetResourceService {
  constructor(
    @InjectModel(GltfModelAsset.name)
    private readonly gltfModelAssetModel: Model<GltfModelAsset>
  ) {}

  async create(
    createGltfModelAssetDto: CreateGltfModelAssetDto
  ): Promise<GltfModelAsset> {
    const createdGltfModelAsset = new this.gltfModelAssetModel(
      createGltfModelAssetDto
    )
    return createdGltfModelAsset.save()
  }

  async createFromFile(file: Express.Multer.File): Promise<GltfModelAsset> {
    // Calcula el hash del archivo (por ejemplo, SHA-256)
    const fileBuffer = fs.readFileSync(file.path)
    const hashSum = crypto.createHash('sha256')
    hashSum.update(fileBuffer)
    const hex = hashSum.digest('hex')

    // Crea el objeto DTO con los datos extraídos del archivo
    const createGltfModelAssetDto: CreateGltfModelAssetDto = {
      filename: file.originalname,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size,
      hash: `sha256:${hex}`
      // Puedes establecer otros campos opcionales aquí si es necesario
    }

    // Validar el tipo MIME
    const allowedTypes = [
      'model/gltf+json',
      'model/gltf-binary',
      'application/octet-stream'
    ]
    if (!allowedTypes.includes(file.mimetype)) {
      // Elimina el archivo si el tipo MIME no es permitido
      fs.unlinkSync(file.path)
      throw new BadRequestException('Tipo de archivo no permitido')
    }

    // Crea y guarda el registro en la base de datos
    const createdGltfModelAsset = new this.gltfModelAssetModel(
      createGltfModelAssetDto
    )
    return createdGltfModelAsset.save()
  }

  async findAll(): Promise<GltfModelAsset[]> {
    return this.gltfModelAssetModel.find().exec()
  }

  async findOne(id: string): Promise<GltfModelAsset> {
    const gltfModelAsset = await this.gltfModelAssetModel.findById(id).exec()

    if (!gltfModelAsset) {
      throw new NotFoundException(`Modelo GLTF con id ${id} no encontrado`)
    }
    return gltfModelAsset
  }

  async findByArticleId(id: string): Promise<GltfModelAsset> {
    try {
      return this.gltfModelAssetModel.findById(id).exec()
    } catch (error) {
      throw new NotFoundException(`Modelo GLTF con id ${id} no encontrado`)
    }
  }

  async update(
    id: string,
    updateGltfModelAssetDto: UpdateGltfModelAssetDto
  ): Promise<GltfModelAsset> {
    const updatedGltfModelAsset = await this.gltfModelAssetModel
      .findByIdAndUpdate(id, updateGltfModelAssetDto, { new: true })
      .exec()

    if (!updatedGltfModelAsset) {
      throw new NotFoundException(`Modelo GLTF con id ${id} no encontrado`)
    }
    return updatedGltfModelAsset
  }

  async remove(id: string): Promise<GltfModelAsset> {
    const deletedGltfModelAsset = await this.gltfModelAssetModel
      .findByIdAndDelete(id)
      .exec()
    if (!deletedGltfModelAsset) {
      throw new NotFoundException(`Modelo GLTF con id ${id} no encontrado`)
    }

    // Llamada al método para eliminar el archivo después de borrar el documento de la base de datos
    await this.removeFile(deletedGltfModelAsset.path)

    return deletedGltfModelAsset
  }

  // Método para eliminar el archivo
  private async removeFile(filePath: string): Promise<void> {
    try {
      fs.unlinkSync(filePath)
      console.log(`Archivo ${filePath} eliminado correctamente`)
    } catch (error) {
      console.error(`Error al eliminar el archivo ${filePath}:`, error)
      throw new NotFoundException(
        `Error al eliminar el archivo en la ruta ${filePath}`
      )
    }
  }
}
