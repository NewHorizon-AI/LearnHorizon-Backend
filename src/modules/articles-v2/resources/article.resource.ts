import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Article } from '../schema/article.schema'

@Injectable()
export class ArticleResource {
  constructor(
    @InjectModel(Article.name) private readonly model: Model<Article>
  ) {}

  // ? Método para obtener todos los artículos
  async findAll() {
    return await this.model.find().exec()
  }

  // ? Método para obtener un artículo por su ID
  async findOneById(id: string) {
    return await this.model.findById(id).exec()
  }

  // ? Método para crear un nuevo artículo
  async create(article: Article) {
    const newArticle = new this.model(article)
    return await newArticle.save()
  }

  // ? Método para actualizar un artículo
  async update(id: string, article: Article) {
    return await this.model.findByIdAndUpdate(id, article, { new: true })
  }

  // ? Método para eliminar un artículo
  async delete(id: string) {
    return await this.model.findByIdAndDelete(id)
  }
}
