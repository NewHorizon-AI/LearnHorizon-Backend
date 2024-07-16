import { Controller, Post, Put, Get, Delete, Body, Param } from '@nestjs/common'

import { Article } from '../schemas/article.schema'

import { ArticleService } from '../services/article.service'

import { CreateArticleCompleteDto } from '../dto/article/create-article-complete.dto'
import { UpdateArticleCompleteDto } from '../dto/article/update-article-complete.dto'

import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'

@ApiTags('articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo artículo completo' })
  @ApiResponse({
    status: 201,
    description: 'El artículo completo ha sido creado con éxito.',
    type: Article
  })
  async create(
    @Body() createArticleCompleteDto: CreateArticleCompleteDto
  ): Promise<Article> {
    return this.articleService.createComplete(createArticleCompleteDto)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un artículo completo existente' })
  @ApiParam({
    name: 'id',
    description: 'ID del artículo',
    example: '60d2f77bcf86cd799439013'
  })
  @ApiResponse({
    status: 200,
    description: 'El artículo completo ha sido actualizado con éxito.',
    type: Article
  })
  async update(
    @Param('id') id: string,
    @Body() updateArticleCompleteDto: UpdateArticleCompleteDto
  ): Promise<Article> {
    return this.articleService.updateComplete(id, updateArticleCompleteDto)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un artículo completo por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del artículo',
    example: '60d2f77bcf86cd799439013'
  })
  @ApiResponse({
    status: 200,
    description: 'El artículo completo ha sido encontrado.',
    type: Article
  })
  async findOne(@Param('id') id: string): Promise<Article> {
    return this.articleService.findOneComplete(id)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un artículo completo por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del artículo',
    example: '60d2f77bcf86cd799439013'
  })
  @ApiResponse({
    status: 200,
    description: 'El artículo completo ha sido eliminado con éxito.'
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.articleService.remove(id)
  }
}
