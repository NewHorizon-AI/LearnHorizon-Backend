import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Data } from '../schema/data.schema'

@Injectable()
export class ArticleDataResource {
  constructor(@InjectModel(Data.name) private readonly model: Model<Data>) {}

  // ? Método para obtener todos los artículos
  async findAll() {
    return await this.model.find().exec()
  }

  // ? Método para obtener un artículo por su ID
  async findOneById(id: string) {
    return await this.model.findById(id).exec()
  }

  // ? Método para crear un nuevo artículo
  async create(articleData: Data) {
    const newArticleData = new this.model(articleData)
    return await newArticleData.save()
  }

  // ? Método para actualizar un artículo
  async update(id: string, articleData: Data) {
    return await this.model.findByIdAndUpdate(id, articleData, { new: true })
  }

  // ? Método para eliminar un artículo
  async delete(id: string) {
    return await this.model.findByIdAndDelete(id)
  }
}
