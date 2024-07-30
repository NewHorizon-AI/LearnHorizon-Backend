import { Controller, Post, Body, Get } from '@nestjs/common'
import { ArticleCompositeService } from '../services/article-composite.service'

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

import { CreateArticleCompleteDto } from '../dtos/article/create-article-complete.dto'
// import { UpdateArticleCompleteDto } from '../dto/article/update-article-complete.dto'

@ApiTags('articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleCompositeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new article' })
  @ApiResponse({
    status: 201,
    description: 'The article has been successfully created.'
  })
  async createArticle(@Body() createArticleDto: CreateArticleCompleteDto) {
    await this.articleService.createCompleteArticle(createArticleDto)
  }

  @Get()
  @ApiOperation({ summary: 'Get all articles' })
  @ApiResponse({
    status: 200,
    description: 'All articles have been successfully obtained.'
  })
  async findAllArticles() {
    return this.articleService.getAllArticlesDetails()
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
  //   await this.articleService.updateComplete(id, updateArticleCompleteDto)
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
  //   return this.articleService.findOneComplete(id)
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
  //   await this.articleService.remove(id)
  // }
}
