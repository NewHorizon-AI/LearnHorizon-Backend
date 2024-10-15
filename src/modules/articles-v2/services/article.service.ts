import { Injectable } from '@nestjs/common'
import { ArticleResourceService } from '../resources/article-resource.sevice'

import { CreateArticleDto } from '../dtos/create-article.dto'
import { UpdateArticleDto } from '../dtos/update-article.dto'
import { Article } from '../schema/article.schema'
import { GltfModelAsset } from 'src/modules/digital-asset/schemas/gltf-model-asset.schema'

@Injectable()
export class ArticleService {
  constructor(private articleResourceService: ArticleResourceService) {}

  async createArticle(createArticleDto: CreateArticleDto): Promise<Article> {
    return await this.articleResourceService.create(createArticleDto)
  }

  async getArticles(): Promise<Article[]> {
    return await this.articleResourceService.findAll()
  }

  async getArticleById(id: string): Promise<Article> {
    return await this.articleResourceService.findOne(id)
  }

  async getAllArticlesByUserId(usersIds: string[]): Promise<Article[]> {
    return await this.articleResourceService.findByUserId(usersIds)
  }

  async getAllModelsByArticleId(articleId: string): Promise<GltfModelAsset[]> {
    return await this.articleResourceService.findGltfModelsByArticleId(
      articleId
    )
  }

  async updateArticle(
    id: string,
    updateArticleDto: UpdateArticleDto
  ): Promise<Article> {
    return await this.articleResourceService.update(id, updateArticleDto)
  }

  async deleteArticle(id: string): Promise<Article> {
    return await this.articleResourceService.remove(id)
  }
}
