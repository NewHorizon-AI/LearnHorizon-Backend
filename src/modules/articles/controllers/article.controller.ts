import { Controller, Post, Put, Body, Get, Param } from '@nestjs/common'

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody
} from '@nestjs/swagger'

// importar Servicios
import { ArticleCompositeService } from '../services/article-composite.service'
import { ArticleBaseService } from '../services/article-services/article-base/article-base.service'

import { CreateArticleCompleteDto } from '../dtos/article/create-article-complete.dto'
import { UpdateArticleCompleteDto } from '../dtos/article/update-article-complete.dto'

import { CreateArticleDto } from '../dtos/article/article-base/create-article.dto'
import { Types } from 'mongoose'

@ApiTags('articles')
@Controller('articles')
export class ArticleController {
  constructor(
    private readonly articleCompositeService: ArticleCompositeService,
    private readonly articleBaseService: ArticleBaseService
  ) {}

  // ! POST

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

  @Get(':id')
  @ApiOperation({ summary: 'Get an article by ID' })
  @ApiResponse({
    status: 200,
    description: 'The article has been successfully obtained.',
    type: UpdateArticleCompleteDto
  })
  @ApiResponse({
    status: 404,
    description: 'Article not found.'
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the article to retrieve',
    schema: { type: 'string' }
  })
  async getArticleDetails(
    @Param('id') article_id: Types.ObjectId
  ): Promise<UpdateArticleCompleteDto> {
    /* 
      * Obtiene un artículo completo por ID
      @ Param article_id ID del artículo a recuperar

    */
    return await this.articleCompositeService.getArticleDetails(article_id)
  }

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
