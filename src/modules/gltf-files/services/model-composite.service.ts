import { Injectable } from '@nestjs/common'

// Importar el Dto completo del modelo
import { CreateModelCompleteDto } from '../dtos/file/create-model-complete.dto.ts'

// Importar los servicios de cada tabla de los modelos
import { ArticleModelEntryService } from './gltf-files-services/article-model-entry/article-mode-entry.service'
import { GltfFileService } from './gltf-files-services/gltf-file/gltf-file.service'
import { ModelTransformationService } from './gltf-files-services/model-transformation/model-transformation.service'

@Injectable()
export class ModelCompositeService {
  constructor(
    private readonly articleModelEntryService: ArticleModelEntryService,
    private readonly gltfFileService: GltfFileService,
    private readonly modelTransformationService: ModelTransformationService
  ) {}

  async createCompleteGltfFile(
    createCompleteGltfFileDto: CreateModelCompleteDto
  ): Promise<void> {
    try {
      await this.articleModelEntryService.createArticleModelEntry(
        createCompleteGltfFileDto.articleModelEntry
      )
      await this.gltfFileService.createGltfFile(
        createCompleteGltfFileDto.gltfFile
      )
      await this.modelTransformationService.createModelTransformation(
        createCompleteGltfFileDto.modelTransformation
      )
    } catch (error) {
      throw error
    }
  }

  /*
  async getAllGltfFilesDetails(): Promise<any[]> {
    return this.modelAggregatorService.getAllGltfFilesDetails()
  } 
  */

  //   findOneComplete(id: string) {
  //     return this.modelGetService.findOneComplete(id)
  //   }

  //   updateComplete(id: string, dto: any) {
  //     return this.modelPutService.updateComplete(id, dto)
  //   }

  //   remove(id: string) {
  //     return this.modelDeleteService.remove(id)
  //   }
}
