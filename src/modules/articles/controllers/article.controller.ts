import {
  Controller,
  Post,
  Put,
  Body,
  Get,
  Param
  // Query,
  // NotFoundException
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger'

// * importar Servicios
import { ArticleCompositeService } from '../services/article-composite.service'
import { ArticleBaseService } from '../services/article-services/article-base/article-base.service'

// * importar DTOs
import { CreateArticleCompleteDto } from '../dtos/article/create-article-complete.dto'
import { UpdateArticleCompleteDto } from '../dtos/article/update-article-complete.dto'

import { ArticleCompositeResponseDto } from '../dtos/response/article-composite-response.dto'

import { CreateArticleDto } from '../dtos/article/article-base/create-article.dto'

@ApiTags('articles')
@Controller('articles')
export class ArticleController {
  constructor(
    private readonly articleCompositeService: ArticleCompositeService,
    private readonly articleBaseService: ArticleBaseService
  ) {}

  // ! POST - Crear un artículo base

  @Post()
  @ApiOperation({ summary: 'Create a new base article' })
  @ApiResponse({
    status: 201,
    description: 'The base article has been successfully created.'
  })
  async createArticleBase(
    @Body() createArticleDto: CreateArticleDto
  ): Promise<CreateArticleDto> {
    const article =
      await this.articleCompositeService.createArticleDraft(createArticleDto)
    return article
  }

  // ! GET

  @Get()
  @ApiOperation({ summary: 'Get all articles' })
  @ApiResponse({
    status: 200,
    description: 'All articles have been successfully obtained.',
    type: CreateArticleCompleteDto,
    isArray: true
  })
  async getAllArticles() {
    return this.articleCompositeService.getAllArticlesDetails()
  }

  @Get('details/:id')
  @ApiOperation({ summary: 'Get an article by ID' })
  @ApiResponse({
    status: 200,
    description: 'The article has been successfully obtained.',
    type: ArticleCompositeResponseDto
  })
  @ApiResponse({
    status: 404,
    description: 'Article not found.'
  })
  async getArticleDetails(@Param('id') article_id: string) {
    /* 
      * Obtiene un artículo completo por ID
      @ Param article_id ID del artículo a recuperar

    */

    return await this.articleCompositeService.getArticleDetails(article_id)
  }

  @Get('details/:id/model')
  @ApiOperation({ summary: 'Get an article by ID with model included' })
  @ApiResponse({
    status: 200,
    description: 'The article has been successfully obtained with model data.',
    type: UpdateArticleCompleteDto
  })
  @ApiResponse({
    status: 404,
    description: 'Article not found.'
  })
  async getArticleDetailWithModel(@Param('id') article_id: string) {
    return await this.articleCompositeService.getArticleDetailsWithModel(
      article_id
    )
  }

  // // ! Get - Obtiene los artículos de un usuario con paginación
  // @Get('user/:id/articles')
  // @ApiOperation({ summary: 'Get articles of a user with pagination' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'The articles of the user have been successfully obtained.',
  //   type: UpdateArticleCompleteDto,
  //   isArray: true
  // })
  // async getArticles(
  //   @Param('id') userId: string,
  //   @Query('limit') limit: number = 10,
  //   @Query('offset') offset: number = 0
  // ): Promise<UpdateArticleCompleteDto[]> {
  //   /*
  //     * Obtiene los artículos de un usuario con paginación
  //     @ Param userId ID del usuario cuyos artículos se van a recuperar
  //     @ Param limit Número de artículos a recuperar
  //     @ Param offset Número de artículos para omitir
  //   */

  //   try {
  //     return this.articleCompositeService.getArticlesByUser(
  //       userId,
  //       limit,
  //       offset
  //     )
  //   } catch (error) {
  //     throw new NotFoundException(error.message)
  //   }
  // }

  // ! PUT

  // * Actualizar un artículo base existente
  @Put(':id')
  @ApiOperation({ summary: 'Update an existing base article' })
  @ApiResponse({
    status: 200,
    description: 'The base article has been successfully updated.'
  })
  @ApiBody({ type: UpdateArticleCompleteDto })
  async updateArticleBase(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleCompleteDto
  ) {
    await this.articleCompositeService.updateArticle(id, updateArticleDto)
  }
}
