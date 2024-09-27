import { Injectable } from '@nestjs/common'
import { ArticleResource } from '../resources/article.resource'

@Injectable()
export class ArticleService {
  constructor(private articleResource: ArticleResource) {}

  // ? Método para obtener todos los artículos
  async findAll() {
    return await this.articleResource.findAll()
  }
}
