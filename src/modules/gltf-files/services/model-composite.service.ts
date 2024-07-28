import { Injectable } from '@nestjs/common'

// Importar los servicios de cada tabla de los modelos
import { ArticleModelEntryService } from './gltf-files-services/article-model-entry/article-mode-entry.service'
import { GltfFileService } from './gltf-files-services/gltf-file/gltf-file.service'
import { ModelTransformationService } from './gltf-files-services/model-transformation/model-transformation.service'

@Injectable()
export class ModelCompositeService {
  constructor(
    private readonly modelGetService: ArticleModelEntryService,
    private readonly modelPostService: GltfFileService,
    private readonly modelPutService: ModelTransformationService
  ) {}

  //   createComplete(dto: any) {
  //     return this.modelPostService.createComplete(dto)
  //   }

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
