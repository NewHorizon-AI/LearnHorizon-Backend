import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  BadRequestException,
  Query
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'

// * importar Servicios
import { ArticleCompositeService } from '../services/article-composite.service'

// * importar DTOs
import { QueryOptionsDto } from '../dtos/article-query/query-options.dto'
import { ArticleCompositeResponseDto } from '../dtos/response/article-composite-response.dto'
import { CreateArticleDto } from '../dtos/article/article-base/create-article.dto'

@ApiTags('articles')
@Controller('articles')
export class ArticleController {
  constructor(
    private readonly articleCompositeService: ArticleCompositeService
  ) {}

  // * Crear un nuevo artículo base
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

  // * Obtener una lista de artículos basada en parámetros de consulta por usuario
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

  // * Obtener una lista de artículos basada en parámetros de consulta por usuario
  @Get('e/:id')
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
  async getEditableArticle(@Param('id') article_id: string) {
    /* 
      * Obtiene un artículo completo por ID
      @ Param article_id ID del artículo a recuperar

    */

    return await this.articleCompositeService.getArticleDetails(article_id)
  }

  // * Obtener una lista de artículos basada en parámetros de consulta por usuario
  @Get('u/:user_id')
  @ApiOperation({
    summary:
      'Obtiene una lista de artículos filtrada por usuario y opciones de consulta',
    description:
      'Este endpoint devuelve una lista de artículos basada en el ID de usuario proporcionado y parámetros adicionales de consulta como paginación y orden.'
  })
  @ApiParam({
    name: 'user_id',
    description:
      'Identificador único del usuario para el cual se recuperan los artículos',
    type: String
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de artículos devuelta exitosamente',
    type: ArticleCompositeResponseDto,
    isArray: true
  })
  @ApiResponse({ status: 403, description: 'Acceso prohibido' })
  @ApiResponse({ status: 400, description: 'Datos de consulta inválidos' })
  getArticlesbyUserAndLimit(
    @Param('user_id') user_id: string,
    @Query() queryOptionsDto: QueryOptionsDto
  ): Promise<ArticleCompositeResponseDto[]> {
    try {
      return this.articleCompositeService.findArticlesByUser(
        user_id,
        queryOptionsDto
      )
    } catch (error) {
      throw new BadRequestException('Error en la consulta: ' + error.message)
    }
  }

  // * Eliminar un artículo por completo basado en su ID
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un articulo por completo.' })
  @ApiResponse({
    status: 200,
    description: 'El articulo ha sido eliminado con exito.'
  })
  @ApiResponse({
    status: 404,
    description: 'Articulo no encontrado.'
  })
  async deleteArticle(@Param('id') article_id: string) {
    try {
      return await this.articleCompositeService.deleteArticle(article_id)
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  // // ! PUT

  // // * Actualizar un artículo base existente
  // @Put(':id')
  // @ApiOperation({ summary: 'Update an existing base article' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'The base article has been successfully updated.'
  // })
  // @ApiBody({ type: UpdateArticleCompleteDto })
  // async updateArticleBase(
  //   @Param('id') id: string,
  //   @Body() updateArticleDto: UpdateArticleCompleteDto
  // ) {
  //   await this.articleCompositeService.updateArticle(id, updateArticleDto)
  // }
}
