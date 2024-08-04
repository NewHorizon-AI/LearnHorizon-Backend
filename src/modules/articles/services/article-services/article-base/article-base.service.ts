import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

// Importing DTOs
import { CreateArticleDto } from '../../../dtos/article/article-base/create-article.dto'
import { UpdateArticleDto } from '../../../dtos/article/article-base/update-article.dto'

// Importar esquema de artículo
import { Article } from '../../../schemas/article.schema'
import { User } from 'src/modules/users/schemas/user.schema'

@Injectable()
export class ArticleBaseService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async createBaseArticle(
    createArticleDto: CreateArticleDto
  ): Promise<Article> {
    if (!createArticleDto) {
      throw new BadRequestException('createArticleDto is required')
    }

    // * Verifica que todos los usuarios en el DTO existan en la base de datos
    for (const userId of createArticleDto.users) {
      const userExists = await this.userModel.findById(userId).exec()
      if (!userExists) {
        throw new BadRequestException(`User with ID ${userId} does not exist`)
      }
    }

    try {
      // * Crea un nuevo artículo
      const newArticle = await this.articleModel.create(createArticleDto)
      return newArticle
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async findAllArticles(): Promise<Article[]> {
    return await this.articleModel.find().exec()
  }

  async findArticleById(article_id: string): Promise<Article> {
    const article = await this.articleModel.findById(article_id).exec()
    if (!article) {
      throw new NotFoundException(`Article with ID ${article_id} not found`)
    }

    return article
  }

  // // Busca un artículo compuesto por su ID y retorna null si no existe
  // async findCompositeArticleById(id: string): Promise<Article> {
  //   const article = await this.articleModel.findById(id).exec()
  //   if (!article) {
  //     return null
  //   }
  //   return article
  // }

  async updateBaseArticle(
    id: string,
    updateArticleDto: UpdateArticleDto
  ): Promise<void> {
    const updateBaseArticle = await this.articleModel
      .findByIdAndUpdate(id, updateArticleDto, { new: true })
      .exec()
    if (!updateBaseArticle) {
      throw new NotFoundException(`Article with ID ${id} not found`)
    }
  }

  async deleteArticle(id: string): Promise<Article> {
    const deletedArticle = await this.articleModel.findByIdAndDelete(id).exec()
    if (!deletedArticle) {
      throw new NotFoundException(`Article with ID ${id} not found`)
    }
    return deletedArticle
  }
}
