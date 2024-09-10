import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { ArticleData } from '../schema/article-data.schema'

@Injectable()
export class ArticleDataResource {
  constructor(
    @InjectModel(ArticleData.name) private readonly model: Model<ArticleData>
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
  async create(articleData: ArticleData) {
    const newArticleData = new this.model(articleData)
    return await newArticleData.save()
  }

  // ? Método para actualizar un artículo
  async update(id: string, articleData: ArticleData) {
    return await this.model.findByIdAndUpdate(id, articleData, { new: true })
  }

  // ? Método para eliminar un artículo
  async delete(id: string) {
    return await this.model.findByIdAndDelete(id)
  }
}
