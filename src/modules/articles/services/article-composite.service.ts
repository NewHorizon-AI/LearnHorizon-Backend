import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

// * (1) Importar Los Esquemas
import { Article } from '../schemas/article.schema'

// * (2) Importar Los Dtos
import { CreateArticleDto } from '../dtos/article/article-base/create-article.dto'
import { UpdateArticleCompleteDto } from '../dtos/article/update-article-complete.dto'

// * (3) Importar los Servicios
import { ArticleBaseService } from './article-services/article-base/article-base.service'
import { ArticleDataService } from '../services/article-services/article-data/article-data.service'
import { ArticleMarkdownService } from '../services/article-services/article-markdown/article-markdown.service'

import { ArticleAggregatorService } from './aggregators/article-aggregator.service'

// * (4) Importar los servicios externos
import { ArticleModelCompositeService } from 'src/modules/article-model/services/article-model-composite.service'
// import { CreateArticleModelDto } from 'src/modules/article-model/dtos/article-model/create-article-model.dto'

@Injectable()
export class ArticleCompositeService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
    private readonly articleAggregatorService: ArticleAggregatorService,
    private articleBaseService: ArticleBaseService,
    private articleDataService: ArticleDataService,
    private articleMarkdownService: ArticleMarkdownService,

    // * Servicios de cada tabla de article model
    private articleModelCompositeService: ArticleModelCompositeService
  ) {}

  // ! POST - create

  async createArticleDraft(createArticleDto: CreateArticleDto): Promise<any> {
    /*
     * Crea un nuevo artículo sin datos adicionales
     @ Param createArticleDto: DTO que contiene los datos necesarios para crear un nuevo artículo
     */

    // * (1) Verifica que el DTO no sea nulo
    if (!createArticleDto) {
      throw new BadRequestException('createArticleDto is required')
    }

    try {
      // * (2) Creacion del artículo
      const article =
        await this.articleBaseService.creatArticle(createArticleDto)

      // * (3) Creación de datos extra del modelo del artículo
      const articleModelTransformation =
        await this.articleModelCompositeService.createArticleModelTransformation()

      // * (3) Creación de datos del modelo del artículo
      const articleModel =
        await this.articleModelCompositeService.createArticleModel(
          article.toJSON()._id,
          articleModelTransformation.toJSON()._id
        )

      // * (4) Union de los datos del artículo
      const articleDetails = {
        article,
        articleModel,
        articleModelTransformation
      }
      return articleDetails
    } catch (error) {
      // * (2) Si falla la creación del artículo, arrojar error
      throw new BadRequestException(error.message)
    }
  }

  // ! GET

  async getAllArticlesDetails(): Promise<any[]> {
    return this.articleAggregatorService.getAllArticlesDetails()
  }

  async getArticleById(article_id: Types.ObjectId): Promise<Article> {
    try {
      return this.articleBaseService.getArticleById(article_id)
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }

  async getArticleDetails(article_id: Types.ObjectId): Promise<any> {
    /*
      * Busca un artículo por ID y devuelve todos los datos relacionados con él
      @ Param article_id ID del artículo a buscar
    */

    try {
      const [
        article,
        articleData,
        articleMarkdown,
        articleModelTransformation
      ] = await Promise.all([
        this.articleBaseService.getArticleById(article_id),
        this.articleDataService.findCompositeArticleDataById(article_id),
        this.articleMarkdownService.findCompositeArticleMarkdownById(
          article_id
        ),
        this.articleModelCompositeService.getTransformationById(article_id)
      ])

      // * (4) Union de los datos del artículo
      const articleDetails = {
        article,
        articleData,
        articleMarkdown,
        articleModelTransformation
      }

      return articleDetails
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }

  // ! UPDATE

  async updateArticle(
    id: string,
    updateArticleDto: UpdateArticleCompleteDto
  ): Promise<void> {
    if (!updateArticleDto) {
      throw new BadRequestException('updateArticleDto is required')
    }
    if (!id) {
      throw new BadRequestException('id is required')
    }

    const { article, articleData, articleMarkdown } = updateArticleDto

    try {
      await this.articleBaseService.updateBaseArticle(id, article)
    } catch (error) {
      throw new NotFoundException(
        `Failed to update base article: ${error.message}`
      )
    }

    try {
      await this.articleDataService.updateCompleteArticleData(id, articleData)
    } catch (error) {
      throw new NotFoundException(
        `Failed to update article articleData: ${error.message}`
      )
    }

    try {
      await this.articleMarkdownService.updateCompleteArticleMarkdown(
        id,
        articleMarkdown
      )
    } catch (error) {
      throw new NotFoundException(
        `Failed to update article articleMarkdown: ${error.message}`
      )
    }
  }

  // async getFullArticleDetails(id: string): Promise<any> {}

  // findOneComplete(id: string) {
  //   return this.articleGetService.findOneComplete(id)
  // }

  // createComplete(dto: any) {
  //   return this.articlePostService.createComplete(dto)
  // }

  // updateComplete(id: string, dto: any) {
  //   return this.articlePutService.updateComplete(id, dto)
  // }

  // remove(id: string) {
  //   return this.articleDeleteService.remove(id)
  // }
}
