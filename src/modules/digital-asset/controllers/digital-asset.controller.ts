// import { Controller, Post, Body, Get, Param } from '@nestjs/common'

// import { DigitalAssetService } from '../services/digital-asset.service'

// import { CreateGltfModelAssetDto } from '../dtos/create-gltf-model-asset.dto'
// import { CreateImageAssetDto } from '../dtos/create-image-asset.dto'

// import { ApiTags } from '@nestjs/swagger'

// @ApiTags('Digital Assets')
// @Controller('digital-assets')
// export class DigitalAssetController {
//   constructor(private readonly digitalAssetService: DigitalAssetService) {}

//   @Post('gltf-model')
//   async createGltfModel(
//     @Body() createGltfModelAssetDto: CreateGltfModelAssetDto
//   ) {
//     return this.digitalAssetService.createGltfModel(createGltfModelAssetDto)
//   }

//   @Post('image')
//   async createImage(@Body() createImageAssetDto: CreateImageAssetDto) {
//     return this.digitalAssetService.createImage(createImageAssetDto)
//   }

//   @Get('gltf-model/:id')
//   async getGltfModel(@Param('id') id: string) {
//     return this.digitalAssetService.findGltfModelById(id)
//   }

//   @Get('image/:id')
//   async getImage(@Param('id') id: string) {
//     return this.digitalAssetService.findImageById(id)
//   }
// }
