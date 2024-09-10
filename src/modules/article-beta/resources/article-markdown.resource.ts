import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { ArticleMarkdown } from '../schema/article-markdown.schema'

@Injectable()
export class ArticleMarkdownResource {
  constructor(
    @InjectModel(ArticleMarkdown.name)
    private readonly model: Model<ArticleMarkdown>
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
  async create(articleMarkdown: ArticleMarkdown) {
    const newArticleMarkdown = new this.model(articleMarkdown)
    return await newArticleMarkdown.save()
  }

  // ? Método para actualizar un artículo
  async update(id: string, articleMarkdown: ArticleMarkdown) {
    return await this.model.findByIdAndUpdate(id, articleMarkdown, {
      new: true
    })
  }

  // ? Método para eliminar un artículo
  async delete(id: string) {
    return await this.model.findByIdAndDelete(id)
  }
}
