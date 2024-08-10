// import {
//   Controller,
//   Post,
//   Get,
//   Put,
//   Delete,
//   Param,
//   Body,
//   UseInterceptors,
//   UploadedFile,
//   BadRequestException
// } from '@nestjs/common'

// import {
//   ApiBody,
//   ApiConsumes,
//   ApiOperation,
//   ApiResponse,
//   ApiTags
// } from '@nestjs/swagger'

// import { FileInterceptor } from '@nestjs/platform-express'

// @Controller('upload/modelo')
// export class UploadModelController {
//   constructor(private readonly modelService: ModelService) {}

//   @Post()
//   @UseInterceptors(FileInterceptor('file'))
//   async createModel(
//     @UploadedFile() file: Express.Multer.File,
//     @Body('article_model_id') articleModelId: string
//   ) {
//     if (!file || !articleModelId) {
//       throw new BadRequestException('Archivo y article_model_id son requeridos')
//     }
//     const model = await this.modelService.createModel(file, articleModelId)
//     return {
//       message: 'Modelo creado exitosamente',
//       data: model
//     }
//   }

//   @Get(':id')
//   async getModel(@Param('id') id: string) {
//     const model = await this.modelService.getModelById(id)
//     return {
//       message: 'Modelo obtenido exitosamente',
//       data: model
//     }
//   }

//   @Put(':id')
//   @UseInterceptors(FileInterceptor('file'))
//   async updateModel(
//     @Param('id') id: string,
//     @UploadedFile() file: Express.Multer.File,
//     @Body('article_model_id') articleModelId: string
//   ) {
//     if (!file || !articleModelId) {
//       throw new BadRequestException('Archivo y article_model_id son requeridos')
//     }
//     const updatedModel = await this.modelService.updateModel(
//       id,
//       file,
//       articleModelId
//     )
//     return {
//       message: 'Modelo actualizado exitosamente',
//       data: updatedModel
//     }
//   }

//   @Delete(':id')
//   async deleteModel(@Param('id') id: string) {
//     await this.modelService.deleteModel(id)
//     return {
//       message: 'Modelo eliminado exitosamente'
//     }
//   }
// }
