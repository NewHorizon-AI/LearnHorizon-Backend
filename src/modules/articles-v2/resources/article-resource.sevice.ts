import mongoose, { Model } from 'mongoose'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Article } from '../schema/article.schema'
import { CreateArticleDto } from '../dtos/create-article.dto'
import { UpdateArticleDto } from '../dtos/update-article.dto'

import { GltfModelAsset } from 'src/modules/digital-asset/schemas/gltf-model-asset.schema'

@Injectable()
export class ArticleResourceService {
  constructor(
    @InjectModel(Article.name) private readonly model: Model<Article>
  ) {}

  async create(createArticle: CreateArticleDto) {
    // * Por cada usuario en el array de usuarios, se verifica si el usuario existe

    const createdArticle = new this.model(createArticle)
    return await createdArticle.save()
  }

  async assignModelsToArticle(articleId: string, modelsIds: string[]) {
    const article = await this.model.findById(articleId).exec()

    if (!article) {
      throw new NotFoundException(
        `El Artículo con ID ${articleId} no se le puede asignar modelos`
      )
    }

    article.models = [
      ...new Set([
        ...article.models,
        ...modelsIds.map((id) => new mongoose.Types.ObjectId(id))
      ])
    ]

    return await article.save()
  }

  async findAll(): Promise<Article[]> {
    return await this.model.find().exec()
  }

  async findOne(id: string): Promise<Article> {
    const article = await this.model.findById(id).exec()

    if (!article) {
      throw new NotFoundException(`El Articulo con ID ${id} no fue encontrado`)
    }

    return article
  }

  async findByUserId(usersId: string[]): Promise<Article[]> {
    try {
      const articles = await this.model.find({ users: { $in: usersId } }).exec()

      if (!articles || articles.length === 0) {
        throw new NotFoundException(
          `Los artículos del usuario ${usersId} no fueron encontrados`
        )
      }

      return articles
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }

  async findGltfModelsByArticleId(
    articleId: string
  ): Promise<GltfModelAsset[]> {
    const article = await this.model
      .findById(articleId)
      .populate('models')
      .exec()

    if (!article) {
      throw new NotFoundException(`Article with ID ${articleId} not found`)
    }

    return article.models as unknown as GltfModelAsset[]
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
