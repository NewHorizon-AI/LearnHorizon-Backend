import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common'

import { ArticleService } from '../services/article.service'
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery
} from '@nestjs/swagger'
import { CreateArticleDto } from '../dtos/create-article.dto'
import { UpdateArticleDto } from '../dtos/update-article.dto'

import { Article } from '../schema/article.schema'
import { FiltersDto } from '../dtos/querys/filters.dto'

@ApiTags('articles')
@Controller('articles/v2')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto) {
    return await this.articleService.createArticle(createArticleDto)
  }

  @Post('/users')
  @ApiOperation({ summary: 'Obtener todos los artículos por IDs de usuario' })
  @ApiBody({
    description:
      'Objeto que contiene una lista de IDs de usuarios para los que se desean obtener artículos',
    schema: {
      type: 'object',
      properties: {
        usersId: {
          type: 'array',
          items: {
            type: 'string',
            example: '60d0fe4f5311236168a109ca'
          }
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de artículos obtenidos correctamente.'
  })
  @ApiResponse({
    status: 400,
    description: 'Solicitud incorrecta, datos inválidos.'
  })
  async getAllArticlesByUserId(@Body() body: { usersId: string[] }) {
    return await this.articleService.getAllArticlesByUserId(body.usersId)
  }

  @Get()
  async findAll() {
    return await this.articleService.getArticles()
  }

  @Post('search')
  @ApiResponse({
    status: 200,
    description: 'Obtiene los artículos paginados y filtrados',
    type: [Article]
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número de la página',
    type: Number,
    example: 1
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Cantidad de artículos por página',
    type: Number,
    example: 10
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    description: 'Campo para ordenar los resultados',
    example: 'createdAt'
  })
  async getPaginatedArticles(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sort') sort: string = 'createdAt',
    @Body() filtersDto: FiltersDto
  ) {
    return await this.articleService.getPaginatedArticles({
      page,
      limit,
      sort,
      filters: filtersDto.filters
    })
  }

  @Get(':id')
  async getArticleById(@Param('id') id: string) {
    return await this.articleService.getArticleById(id)
  }

  @Get('models/:articleId')
  async getAllModelsByArticleId(@Param('articleId') articleId: string) {
    return await this.articleService.getAllModelsByArticleId(articleId) // Pasamos el arreglo de IDs al servicio
  }

  @Patch(':id')
  async updateArticle(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto
  ) {
    return await this.articleService.updateArticle(id, updateArticleDto)
  }

  @Delete(':articleId')
  async deleteArticle(@Param('articleId') articleId: string) {
    return await this.articleService.deleteArticle(articleId)
  }
}
