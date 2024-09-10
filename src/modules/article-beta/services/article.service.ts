import { Injectable } from '@nestjs/common'

import { ArticleResource } from '../resources/article.resource'

@Injectable()
export class ArticleService {
  constructor(private ArticleResource: ArticleResource) {}

  // ? Método para obtener todos los artículos
  async findAll() {
    return await this.ArticleResource.findAll()
  }
}
