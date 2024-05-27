import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  Post,
  Put
} from '@nestjs/common'
import { Publication } from 'src/modules/publications/schemas/publication.schema'
import { PublicationService } from '../services/publication.service'

// Importacion de los Data Transfer Objects (DTO)
import { CreatePublicationDto } from 'src/modules/publications/dto/create-publication.dto'
import { UpdatePublicationDto } from 'src/modules/publications/dto/update-publication.dto'
import { FindParamsDto } from 'src/modules/publications/dto/query-parameters/find-params.dto'

// Importacion de las clases para las respuestas
import { PublicationResponse } from 'src/interfaces/responses/content-model.model'
import { ArticlePublication } from 'src/interfaces/responses/article-publication.model'

// Importaciones de Swagger
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('publications')
@Controller('publications')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  // Metodo para crear una publicación
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una nueva publicación' })
  @ApiResponse({
    status: 201,
    description: 'La publicación ha sido creada exitosamente.',
    type: Publication
  })
  async create(
    @Body() createPublicationDto: CreatePublicationDto
  ): Promise<Publication> {
    return await this.publicationService.create(createPublicationDto)
  }

  // Metodo para obtener todas las publicaciones
  @Get()
  @ApiOperation({ summary: 'Obtener todas las publicaciones' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todas las publicaciones.',
    type: [Publication]
  })
  async findAll(): Promise<Publication[]> {
    return this.publicationService.findAll()
  }

  // Metodo para obtener una publicación por id
  @Get('publication/:id')
  @ApiOperation({ summary: 'Obtener una publicación por ID' })
  @ApiResponse({
    status: 200,
    description: 'La publicación ha sido encontrada.',
    type: Publication
  })
  @ApiResponse({
    status: 404,
    description: 'Publicación no encontrada.'
  })
  async findOne(@Param('id') id: string): Promise<Publication> {
    return await this.publicationService.findOne(id)
  }

  // Metodo para obtener todas las publicaciones por id de categoría
  @Get('category/:id')
  @ApiOperation({
    summary: 'Obtener todas las publicaciones por ID de categoría'
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de publicaciones por categoría.',
    type: [Publication]
  })
  async findAllByCategoryId(@Param('id') id: string): Promise<Publication[]> {
    return await this.publicationService.findAllByCategoryId(id)
  }

  // Metodo para obtener publicaciones con paginación
  @Get('search')
  @ApiOperation({ summary: 'Obtener publicaciones con paginación y ordenadas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de publicaciones paginadas y ordenadas.',
    type: [PublicationResponse]
  })
  async findPaginatedAndOrdered(
    @Query() params: FindParamsDto
  ): Promise<PublicationResponse[]> {
    return this.publicationService.findPaginatedAndOrdered(params)
  }

  // Metodo para obtener la informcion necesaria para la vista de un articulo
  @Get('model/:id')
  @ApiOperation({ summary: 'Obtener el modelo de vista de una publicación' })
  @ApiResponse({
    status: 200,
    description: 'El modelo de vista de la publicación ha sido encontrado.',
    type: ArticlePublication
  })
  async findPublicationModel(
    @Param('id') id: string
  ): Promise<ArticlePublication> {
    return this.publicationService.findPublicationModel(id)
  }

  // Metodo para actualizar una publicación
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una publicación' })
  @ApiResponse({
    status: 200,
    description: 'La publicación ha sido actualizada exitosamente.',
    type: Publication
  })
  @ApiResponse({
    status: 404,
    description: 'Publicación no encontrada.'
  })
  async update(
    @Param('id') id: string,
    @Body() updatePublicationDto: UpdatePublicationDto
  ): Promise<Publication> {
    return await this.publicationService.update(id, updatePublicationDto)
  }

  // Metodo para eliminar una publicación
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una publicación' })
  @ApiResponse({
    status: 204,
    description: 'La publicación ha sido eliminada exitosamente.'
  })
  @ApiResponse({
    status: 404,
    description: 'Publicación no encontrada.'
  })
  async delete(@Param('id') id: string): Promise<void> {
    await this.publicationService.delete(id)
  }
}
