import { Model } from 'mongoose'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Article } from '../schema/article.schema'
import { CreateArticleDto } from '../dtos/create-article.dto'
import { UpdateArticleDto } from '../dtos/update-article.dto'

@Injectable()
export class ArticleResourceService {
  constructor(
    @InjectModel(Article.name) private readonly model: Model<Article>
  ) {}

  // ? Método para crear un nuevo artículo
  async create(createArticle: CreateArticleDto) {
    // * Por cada usuario en el array de usuarios, se verifica si el usuario existe

    const createdArticle = new this.model(createArticle)
    return await createdArticle.save()
  }

  // ? Método para obtener todos los artículos
  async findAll(): Promise<Article[]> {
    return await this.model.find().exec()
  }

  // ? Método para obtener un artículo por su ID
  async findOne(id: string): Promise<Article> {
    const article = await this.model.findById(id).exec()

    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`)
    }

    return article
  }

  // ? Método para actualizar un artículo
  async update(id: string, updateArticle: UpdateArticleDto): Promise<Article> {
    const updatedArticle = await this.model.findByIdAndUpdate(
      id,
      updateArticle,
      { new: true }
    )

    if (!updatedArticle) {
      throw new NotFoundException(`Article with ID ${id} not found`)
    }

    return updatedArticle
  }

  // ? Método para eliminar un artículo
  async remove(id: string): Promise<Article> {
    const deletedArticle = await this.model.findByIdAndDelete(id)

    if (!deletedArticle) {
      throw new NotFoundException(`Article with ID ${id} not found`)
    }

    return deletedArticle
  }
}
