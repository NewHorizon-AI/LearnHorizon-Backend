import { Injectable } from '@nestjs/common'

// Importar el Dto completo del artículo
import { CreateArticleCompleteDto } from '../dtos/article/create-article-complete.dto'

// Importar los servicios necesarios
import { ArticleBaseService } from './article-base/article-base.service'

@Injectable()
export class ArticleService {
  constructor(private articleBaseService: ArticleBaseService) {}

  async createCompleterArticle(
    createArticleDto: CreateArticleCompleteDto
  ): Promise<void> {
    try {
      await this.articleBaseService.createArticle(createArticleDto.article)
    } catch (error) {
      throw error
    }
  }

  // findOneComplete(id: string) {
  //   return this.articleGetService.findOneComplete(id)
  // }

  // createComplete(dto: any) {
  //   return this.articlePostService.createComplete(dto)
  // }

  // updateComplete(id: string, dto: any) {
  //   return this.articlePutService.updateComplete(id, dto)
  // }

  // remove(id: string) {
  //   return this.articleDeleteService.remove(id)
  // }
}
