import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MulterModule } from '@nestjs/platform-express'
import { MongooseModule } from '@nestjs/mongoose'

// * Importacion de schemas
// import {
//   DigitalAsset,
//   DigitalAssetSchema
// } from './schemas/digital-asset.schema'

import {
  GltfModelAsset,
  GltfModelAssetSchema
} from './schemas/gltf-model-asset.schema'

import { ImageAsset, ImageAssetSchema } from './schemas/image-asset.schema'

// * Importacion de controladores
import { GltfModelAssetController } from './controllers/gltf-model-asset/gltf-model-asset.controller'
// * Importacion de servicios
import { MulterConfigService } from './config/multer-config.service'

// * Importacion de recursos
import { GltfModelAssetResourceService } from './resources/gltf-model-asset-resource.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GltfModelAsset.name, schema: GltfModelAssetSchema },
      { name: ImageAsset.name, schema: ImageAssetSchema }
    ]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useClass: MulterConfigService
    })
  ],
  controllers: [GltfModelAssetController],
  providers: [GltfModelAssetResourceService],
  exports: [MongooseModule]
})
export class DigitalAssetModule {}
