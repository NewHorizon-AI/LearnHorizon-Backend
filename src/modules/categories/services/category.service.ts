import { Injectable } from '@nestjs/common'
import { CategoryGetService } from './get/category-get.service'
import { CategoryPostService } from './post/category-post.service'
import { CategoryPutService } from './put/category-put.service'
import { CategoryDeleteService } from './delete/category-delete.service'

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryGetService: CategoryGetService,
    private readonly categoryPostService: CategoryPostService,
    private readonly categoryPutService: CategoryPutService,
    private readonly categoryDeleteService: CategoryDeleteService
  ) {}

  findOneComplete(id: string) {
    return this.categoryGetService.findOneComplete(id)
  }

  createComplete(dto: any) {
    return this.categoryPostService.createComplete(dto)
  }

  updateComplete(id: string, dto: any) {
    return this.categoryPutService.updateComplete(id, dto)
  }

  remove(id: string) {
    return this.categoryDeleteService.remove(id)
  }
}
