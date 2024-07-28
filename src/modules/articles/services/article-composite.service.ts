import { Injectable } from '@nestjs/common'

// Importar el Dto completo del artículo
import { CreateArticleCompleteDto } from '../dtos/article/create-article-complete.dto'

// Importar los servicios de cada tabla de los artículos
import { ArticleBaseService } from './article-services/article-base/article-base.service'
import { ArticleDataService } from './article-services/article-data/article-data.service'
import { ArticleMarkdownService } from './article-services/article-markdown/article-markdown.service'

// Importar agregador
import { ArticleAggregatorService } from './aggregators/article-aggregator.service'

@Injectable()
export class ArticleCompositeService {
  constructor(
    private readonly articleAggregatorService: ArticleAggregatorService,
    private articleBaseService: ArticleBaseService,
    private articleDataService: ArticleDataService,
    private articleMarkdownService: ArticleMarkdownService
  ) {}

  async createCompleterArticle(
    createArticleDto: CreateArticleCompleteDto
  ): Promise<void> {
    try {
      await this.articleBaseService.createArticle(createArticleDto.article)
    } catch (error) {
      throw error
    }
  }

  async getAllArticlesDetails(): Promise<any[]> {
    return this.articleAggregatorService.getAllArticlesDetails()
  }

  // async getFullArticleDetails(id: string): Promise<any> {}

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
