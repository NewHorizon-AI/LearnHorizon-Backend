import { Injectable } from '@nestjs/common'

import { ModelGetService } from './get/model-get.service'
import { ModelPostService } from './post/model-post.service'
import { ModelPutService } from './put/model-put.service'
import { ModelDeleteService } from './delete/model-delete.service'

@Injectable()
export class ModelService {
  constructor(
    private readonly modelGetService: ModelGetService,
    private readonly modelPostService: ModelPostService,
    private readonly modelPutService: ModelPutService,
    private readonly modelDeleteService: ModelDeleteService
  ) {}

  findOneComplete(id: string) {
    return this.modelGetService.findOneComplete(id)
  }

  createComplete(dto: any) {
    return this.modelPostService.createComplete(dto)
  }

  updateComplete(id: string, dto: any) {
    return this.modelPutService.updateComplete(id, dto)
  }

  remove(id: string) {
    return this.modelDeleteService.remove(id)
  }
}
