import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

// Importing DTOs
import { CreateArticleDto } from '../../dtos/article/article-base/create-article.dto'

// Importar esquema de artículo
import { Article } from '../../schemas/article.schema'

@Injectable()
export class ArticleBaseService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>
  ) {}

  async createArticle(createArticleDto: CreateArticleDto): Promise<Article> {
    if (!createArticleDto) {
      throw new Error('createArticleDto is required')
    }

    const newArticle = new this.articleModel(createArticleDto)
    return newArticle.save()
  }
}
