import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common'

import { ArticleService } from '../services/article.service'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateArticleDto } from '../dtos/create-article.dto'
import { UpdateArticleDto } from '../dtos/update-article.dto'

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

  @Delete(':id')
  async deleteArticle(@Param('id') id: string) {
    return await this.articleService.deleteArticle(id)
  }
}
