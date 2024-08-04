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

  // * Obtener un artículo completo por ID
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
  async getArticlModelEntryById(
    @Param('id') article_id: string
  ): Promise<UpdateArticleCompleteDto> {
    const article =
      await this.articleCompositeService.getArticleDetails(article_id)
    return article
  }

  // @Get('model/:id')
  // @ApiOperation({ summary: 'Get an article by ID' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'The article has been successfully obtained.'
  // })
  // @ApiResponse({
  //   status: 404,
  //   description: 'Article not found.'
  // })
  // @ApiParam({
  //   name: 'id',
  //   required: true,
  //   description: 'The ID of the article to retrieve',
  //   schema: { type: 'string' }
  // })
  // async getArticleDetailsById(@Param('id') _id: string) {
  //   const article = await this.articleCompositeService.getArticleDetails(_id)

  //   return article
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

  // @Put(':id')
  // @ApiOperation({ summary: 'Actualizar un artículo completo existente' })
  // @ApiParam({
  //   name: 'id',
  //   description: 'ID del artículo',
  //   example: '60d2f77bcf86cd799439013'
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'El artículo completo ha sido actualizado con éxito.'
  // })
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateArticleCompleteDto: UpdateArticleCompleteDto
  // ): Promise<void> {
  //   await this.articleCompositeService.updateComplete(id, updateArticleCompleteDto)
  // }

  // @Get(':id')
  // @ApiOperation({ summary: 'Obtener un artículo completo por ID' })
  // @ApiParam({
  //   name: 'id',
  //   description: 'ID del artículo',
  //   example: '60d2f77bcf86cd799439013'
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'El artículo completo ha sido encontrado.'
  // })
  // async findOne(@Param('id') id: string): Promise<any> {
  //   return this.articleCompositeService.findOneComplete(id)
  // }

  // @Delete(':id')
  // @ApiOperation({ summary: 'Eliminar un artículo completo por ID' })
  // @ApiParam({
  //   name: 'id',
  //   description: 'ID del artículo',
  //   example: '60d2f77bcf86cd799439013'
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'El artículo completo ha sido eliminado con éxito.'
  // })
  // async remove(@Param('id') id: string): Promise<void> {
  //   await this.articleCompositeService.remove(id)
  // }
}
