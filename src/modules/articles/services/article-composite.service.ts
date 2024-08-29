import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { Types } from 'mongoose'

// * (1) Importar Los Esquemas
import { Article } from '../schemas/article.schema'

// * (2) Importar Los Dtos
import { CreateArticleDto } from '../dtos/article/article-base/create-article.dto'
// import { UpdateArticleCompleteDto } from '../dtos/article/update-article-complete.dto'

// * (3) Importar los Servicios
import { ArticleBaseService } from './article-services/article-base/article-base.service'
import { ArticleDataService } from '../services/article-services/article-data/article-data.service'
import { ArticleMarkdownService } from '../services/article-services/article-markdown/article-markdown.service'

// * (4) Importar los servicios externos
import { ArticleModelCompositeService } from 'src/modules/article-model/services/article-model-composite.service'
// import { CreateArticleModelDto } from 'src/modules/article-model/dtos/article-model/create-article-model.dto'

@Injectable()
export class ArticleCompositeService {
  constructor(
    private articleBaseService: ArticleBaseService,
    private articleDataService: ArticleDataService,
    private articleMarkdownService: ArticleMarkdownService,

    // * Servicios de cada tabla de article model
    private articleModelCompositeService: ArticleModelCompositeService
  ) {}

  // ! createArticleDraft - Crea la base de un artículo con datos mínimos
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

      // * (3) Creación de datos del modelo del artículo
      const articleModel =
        await this.articleModelCompositeService.createArticleModel(
          article.toJSON()._id
        )

      // * (3) Creación de datos extra del modelo del artículo
      const transformation =
        await this.articleModelCompositeService.createArticleModelTransformation(
          articleModel.toJSON()._id
        )

      // * (4) Union de los datos del artículo
      const articleDetails = {
        article,
        transformation
      }
      return articleDetails
    } catch (error) {
      // * (2) Si falla la creación del artículo, arrojar error
      throw new BadRequestException(error.message)
    }
  }

  // // ! getAllArticlesDetails - Obtiene todos los artículos con todos sus datos
  // async getAllArticlesDetails(): Promise<any[]> {
  //   return this.articleAggregatorService.getAllArticlesDetails()
  // }

  // ! getArticleDetails - Obtiene un artículo por ID con todos sus datos
  async getArticleById(article_id: Types.ObjectId): Promise<Article> {
    try {
      return this.articleBaseService.getArticleById(article_id)
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }

  // ! getArticleDetails - Obtiene un artículo por ID con todos sus datos
  async getArticleDetails(article_id: string): Promise<any> {
    /*
      * Busca un artículo por ID y devuelve todos los datos relacionados con él
      @ Param article_id ID del artículo a buscar
    */

    const object_id = new Types.ObjectId(article_id)

    try {
      const [article, data, markdown, transformation] = await Promise.all([
        this.articleBaseService.getArticleById(object_id),
        this.articleDataService.findCompositeArticleDataById(object_id),
        this.articleMarkdownService.findCompositeArticleMarkdownById(object_id),
        this.articleModelCompositeService.getTransformationById(object_id)
      ])

      // * (4) Union de los datos del artículo
      const articleDetails = {
        article,
        data,
        markdown,
        transformation
      }

      return articleDetails
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }

  // ! findArticlesByUser - Obtiene una lista de artículos por usuario y opciones de consulta de paginación y orden
  async findArticlesByUser(
    user_id: string,
    queryOptionsDto: any
  ): Promise<any[]> {
    /*
      * Obtiene una lista de artículos por usuario y opciones de consulta
      @ Param user_id ID del usuario para el cual se recuperan los artículos
      @ Param queryOptionsDto DTO que contiene opciones de consulta como paginación y orden
    */

    try {
      const articleBaseArray =
        await this.articleBaseService.getArticlesByUserAndPage(
          user_id,
          queryOptionsDto
        )

      // Obtener todos los datos de los artículos
      const articleWithDataArray = await Promise.all(
        articleBaseArray.map(async (article) => {
          const data =
            await this.articleDataService.findCompositeArticleDataById(
              article._id
            )
          return { ...article, data }
        })
      )

      return articleWithDataArray
    } catch (error) {
      throw new BadRequestException('Error en la consulta: ' + error.message)
    }
  }

  // // ! UPDATE

  // async updateArticle(
  //   id: string,
  //   updateArticleDto: UpdateArticleCompleteDto
  // ): Promise<void> {
  //   if (!updateArticleDto) {
  //     throw new BadRequestException('updateArticleDto is required')
  //   }
  //   if (!id) {
  //     throw new BadRequestException('id is required')
  //   }

  //   const { article, articleData, articleMarkdown } = updateArticleDto

  //   try {
  //     await this.articleBaseService.updateBaseArticle(id, article)
  //   } catch (error) {
  //     throw new NotFoundException(
  //       `Failed to update base article: ${error.message}`
  //     )
  //   }

  //   try {
  //     await this.articleDataService.updateCompleteArticleData(id, articleData)
  //   } catch (error) {
  //     throw new NotFoundException(
  //       `Failed to update article articleData: ${error.message}`
  //     )
  //   }

  //   try {
  //     await this.articleMarkdownService.updateCompleteArticleMarkdown(
  //       id,
  //       articleMarkdown
  //     )
  //   } catch (error) {
  //     throw new NotFoundException(
  //       `Failed to update article articleMarkdown: ${error.message}`
  //     )
  //   }
  // }

  // ! deleteArticle - Elimina un artículo por completo
  async deleteArticle(article_id: string): Promise<void> {
    try {
      const object_id = new Types.ObjectId(article_id)

      await Promise.all([
        this.articleBaseService.deleteArticle(object_id),
        this.articleDataService.deleteArticleData(object_id),
        this.articleMarkdownService.deleteArticleMarkdown(object_id),
        this.articleModelCompositeService.deleteArticleModelCascade(object_id)
      ])
    } catch (error) {
      throw new Error(
        `Error deleting article and related resources: ${error.message}`
      )
    }
  }
}
