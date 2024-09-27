import { Injectable } from '@nestjs/common'
import { ArticleBaseService } from '../article-services/article-base/article-base.service'
import { ArticleDataService } from '../article-services/article-data/article-data.service'
import { ArticleMarkdownService } from '../article-services/article-markdown/article-markdown.service'

import { InjectModel } from '@nestjs/mongoose'

import { Article } from '../../schemas/article.schema'
import { User } from 'src/modules/users/schemas/user.schema'
import { Model } from 'mongoose'

@Injectable()
export class ArticleAggregatorService {
  constructor(
    private readonly articleBaseService: ArticleBaseService,
    private readonly articleDataService: ArticleDataService,
    private readonly articleMarkdownService: ArticleMarkdownService,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  /**
   * Método público principal para obtener todos los detalles de los artículos.
   * Este método recopila todos los artículos y procesa sus detalles en paralelo.
   */
  async getAllArticlesDetails(): Promise<any[]> {
    const articles = await this.articleBaseService.findAllArticles()
    return Promise.all(
      articles.map((article) => this.assembleArticleDetails(article))
    )
  }

  /**
   * Método auxiliar para ensamblar los detalles de un solo artículo.
   * Combina los datos de diferentes fuentes relacionadas con cada artículo.
   */
  private async assembleArticleDetails(article: Article): Promise<any> {
    const [articleData, articleMarkdown, users] = await Promise.all([
      this.fetchArticleData(article._id),
      this.fetchArticleMarkdown(article._id),
      this.validateUsers(article.users)
    ])

    return this.formatArticleResponse(
      article,
      articleData,
      articleMarkdown,
      users
    )
  }

  private async validateUsers(userIds: User[]): Promise<string[]> {
    return Promise.all(
      userIds.map(async (userId) => {
        const user = await this.userModel.findById(userId).exec()
        if (!user) {
          // console.error(`User with ID ${userId} not found`)
          return
        }
        return user._id.toString()
      })
    )
  }

  /**
   * Método para obtener datos del artículo desde el servicio de datos.
   * Maneja errores devolviendo un objeto vacío si la búsqueda falla.
   */
  private async fetchArticleData(articleId: any): Promise<any> {
    return this.articleDataService
      .findArticleDataById(articleId)
      .catch(() => ({}))
  }

  /**
   * Método para obtener datos de markdown del artículo desde el servicio correspondiente.
   * Similar al método fetchArticleData, maneja errores y devuelve un objeto vacío si hay fallos.
   */
  private async fetchArticleMarkdown(articleId: any): Promise<any> {
    return this.articleMarkdownService
      .findArticleMarkdownById(articleId)
      .catch(() => ({}))
  }

  /**
   * Formatea la respuesta combinando el artículo, sus datos y markdown en una estructura unificada.
   * Este método centraliza la creación del objeto de respuesta para facilitar futuras modificaciones.
   */
  private formatArticleResponse(
    article: Article,
    articleData: any,
    articleMarkdown: any,
    users: string[]
  ): any {
    return {
      article: {
        _id: article._id,
        title: article.title,
        status: article.status,
        users: users
      },
      data: articleData,
      markdown: articleMarkdown
    }
  }
}
