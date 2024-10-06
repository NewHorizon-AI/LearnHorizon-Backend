import { Injectable } from '@nestjs/common'
import { ArticleResourceService } from '../resources/article-resource.sevice'

import { CreateArticleDto } from '../dtos/create-article.dto'
import { UpdateArticleDto } from '../dtos/update-article.dto'
import { Article } from '../schema/article.schema'

@Injectable()
export class ArticleService {
  constructor(private articleResourceService: ArticleResourceService) {}

  // ? Método para crear un artículo
  async createArticle(createArticleDto: CreateArticleDto): Promise<Article> {
    return await this.articleResourceService.create(createArticleDto)
  }

  // ? Método para obtener todos los artículos
  async getArticles(): Promise<Article[]> {
    return await this.articleResourceService.findAll()
  }

  // ? Método para obtener un artículo por ID
  async getArticleById(id: string): Promise<Article> {
    return await this.articleResourceService.findOne(id)
  }

  // ? Método para actualizar un artículo
  async updateArticle(
    id: string,
    updateArticleDto: UpdateArticleDto
  ): Promise<Article> {
    return await this.articleResourceService.update(id, updateArticleDto)
  }

  // ? Método para eliminar un artículo
  async deleteArticle(id: string): Promise<Article> {
    return await this.articleResourceService.remove(id)
  }
}
