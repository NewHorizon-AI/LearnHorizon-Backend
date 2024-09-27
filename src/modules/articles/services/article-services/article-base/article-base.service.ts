import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

// Importing DTOs
import { CreateArticleDto } from '../../../dtos/article/article-base/create-article.dto'
import { UpdateArticleDto } from '../../../dtos/article/article-base/update-article.dto'
import { QueryOptionsDto } from '../../../dtos/article-query/query-options.dto'

// Importar esquema de artículo
import { Article } from '../../../schemas/article.schema'
import { User } from 'src/modules/users/schemas/user.schema'

@Injectable()
export class ArticleBaseService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  // ! createArticle - Crea un nuevo artículo con datos mínimos
  async creatArticle(createArticleDto: CreateArticleDto): Promise<Article> {
    /* 
    * Crea un nuevo artículo con los datos proporcionados
    @ Param createArticleDto: DTO que contiene los datos necesarios para crear un nuevo artículo
    @ Return: Artículo recién creado
    TODO: Mejorar la verificacion de los usuarios 
    */

    // * (1) Verifica que el DTO no sea nulo
    if (!createArticleDto) {
      throw new BadRequestException('createArticleDto is required')
    }

    // * (3) Verifica que todos los usuarios en el DTO existan en la base de datos
    for (const user_id of createArticleDto.users) {
      const userExists = await this.userModel.findById(user_id).exec()
      if (!userExists) {
        throw new BadRequestException(`User with ID ${user_id} does not exist`)
      }
    }

    try {
      // * (4) Crear un nuevo artículo
      const newArticle = await this.articleModel.create(createArticleDto)

      // * (5) Devuelve el artículo recién creado
      return newArticle
    } catch (error) {
      // * (2) Manejar errores
      throw new BadRequestException(error.message)
    }
  }

  async findAllArticles(): Promise<Article[]> {
    return await this.articleModel.find().exec()
  }

  async getArticleById(article_id: Types.ObjectId): Promise<Article> {
    /*
     * Obtiene un artículo completo por ID
     @ Param article_id ID del artículo a recuperar
    */

    // * (1) Llamar al servicio para obtener los detalles del artículo
    return await this.articleModel.findById(article_id).exec()
  }

  async getArticlesByUserAndPage(
    user_id: string,
    queryOptions: QueryOptionsDto
  ): Promise<any[]> {
    const { page, pageSize, order } = queryOptions

    const sortOrder = order === 'ascendant' ? 'asc' : 'desc'

    const articles = await this.articleModel
      .find({ users: user_id })
      .sort({ createdAt: sortOrder }) // Asumiendo que quieres ordenar por fecha de creación
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean()
      .exec()

    return articles
  }

  async updateBaseArticle(
    id: string,
    updateArticleDto: UpdateArticleDto
  ): Promise<void> {
    const updateBaseArticle = await this.articleModel
      .findByIdAndUpdate(id, updateArticleDto, { new: true })
      .exec()
    if (!updateBaseArticle) {
      throw new NotFoundException(`Article with ID ${id} not found`)
    }
  }

  async deleteArticle(id: Types.ObjectId): Promise<void> {
    /*
     * Elimina un artículo por ID
     @ Param id ID del artículo a eliminar
     */

    // * Validar que el artículo exista
    const article = await this.articleModel.findById(id).exec()

    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`)
    }

    await this.articleModel.deleteOne({ _id: id })
  }
}
