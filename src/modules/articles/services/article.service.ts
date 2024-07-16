import { Injectable } from '@nestjs/common'
import { ArticleGetService } from './get/article-get.service'
import { ArticlePostService } from './post/article-post.service'
import { ArticlePutService } from './put/article-put.service'
import { ArticleDeleteService } from './delete/article-delete.service'

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleGetService: ArticleGetService,
    private readonly articlePostService: ArticlePostService,
    private readonly articlePutService: ArticlePutService,
    private readonly articleDeleteService: ArticleDeleteService
  ) {}

  findOneComplete(id: string) {
    return this.articleGetService.findOneComplete(id)
  }

  createComplete(dto: any) {
    return this.articlePostService.createComplete(dto)
  }

  updateComplete(id: string, dto: any) {
    return this.articlePutService.updateComplete(id, dto)
  }

  remove(id: string) {
    return this.articleDeleteService.remove(id)
  }
}
