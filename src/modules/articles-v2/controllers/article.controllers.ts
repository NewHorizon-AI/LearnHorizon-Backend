import { Controller, Get, Param } from '@nestjs/common'

import { ArticleService } from '../services/article.service'

@Controller('v2/articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get(':id')
  async getArticleById(@Param('id') articleId: string) {
    console.log('ArticleController -> getArticleById -> articleId', articleId)
    return await this.articleService.findAll()
  }

  @Get(':id')
  async getArticleDataByArticleId(@Param('id') articleId: string) {
    console.log('ArticleController -> getArticleById -> articleId', articleId)
    return await this.articleService.findAll()
  }
}
