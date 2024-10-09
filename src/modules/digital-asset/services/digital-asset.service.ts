// import { Injectable, NotFoundException } from '@nestjs/common'
// import { InjectModel } from '@nestjs/mongoose'
// import { Model } from 'mongoose'

// import { GltfModelAsset } from '../schemas/gltf-model-asset.schema'
// import { ImageAsset } from '../schemas/image-asset.schema'
// import { CreateGltfModelAssetDto } from '../dtos/create-gltf-model-asset.dto'
// // import { CreateImageAssetDto } from '../dtos/create-image-asset.dto'

// @Injectable()
// export class DigitalAssetService {
//   constructor(
//     @InjectModel(GltfModelAsset.name)
//     private gltfModelAssetModel: Model<GltfModelAsset>,
//     @InjectModel(ImageAsset.name) private imageAssetModel: Model<ImageAsset>
//   ) {}

//   async createGltfModel(createGltfModelDto: CreateGltfModelAssetDto) {
//     const newGltfModel = new this.gltfModelAssetModel(createGltfModelDto)
//     return newGltfModel.save()
//   }

//   async createImage(createImageAssetDto: CreateImageAssetDto) {
//     const newImage = new this.imageAssetModel(createImageAssetDto)
//     return newImage.save()
//   }

//   async findGltfModelById(id: string) {
//     const gltfModel = await this.gltfModelAssetModel.findById(id).exec()
//     if (!gltfModel) {
//       throw new NotFoundException(`Modelo GLTF con id ${id} no encontrado`)
//     }
//     return gltfModel
//   }

//   async findImageById(id: string) {
//     const image = await this.imageAssetModel.findById(id).exec()
//     if (!image) {
//       throw new NotFoundException(`Imagen con id ${id} no encontrada`)
//     }
//     return image
//   }
// }
