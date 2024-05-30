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
  Put,
  HttpException,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Publication } from '../schemas/publication.schema'
import { PublicationService } from '../services/publication.service'

// Importacion de los Data Transfer Objects (DTO)
import { CreatePublicationDto } from '../dto/create-publication.dto'
import { UpdatePublicationDto } from '../dto/update-publication.dto'
import { FindParamsDto } from '../dto/query-parameters/find-params.dto'

// Importacion de las clases para las respuestas
import { PublicationResponse } from 'src/interfaces/responses/content-model.model'
import { ArticlePublication } from 'src/interfaces/responses/article-publication.model'

// Importaciones de Swagger
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiBody
} from '@nestjs/swagger'

import { MyCustomException } from 'src/exceptions/my-custom.exception'
import { CreateObject3DDto } from 'src/modules/objects3d/dto/create-object3d.dto'

@ApiTags('publications')
@Controller('publications')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una nueva publicación' })
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreatePublicationDto })
  @ApiResponse({
    status: 201,
    description: 'La publicación ha sido creada exitosamente.',
    type: Publication
  })
  async create(
    @Body() createPublicationDto: CreatePublicationDto,
    @Body() createObject3DDto: CreateObject3DDto
  ): Promise<Publication> {
    try {
      const result = this.publicationService.create(
        createPublicationDto,
        createObject3DDto
      )
      return result
    } catch (error) {
      if (error instanceof MyCustomException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

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

  @Get('publication/:id')
  @ApiOperation({ summary: 'Obtener una publicación por ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID de la publicación' })
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

  @Get('category/:id')
  @ApiOperation({
    summary: 'Obtener todas las publicaciones por ID de categoría'
  })
  @ApiParam({ name: 'id', required: true, description: 'ID de la categoría' })
  @ApiResponse({
    status: 200,
    description: 'Lista de publicaciones por categoría.',
    type: [Publication]
  })
  async findAllByCategoryId(@Param('id') id: string): Promise<Publication[]> {
    return await this.publicationService.findAllByCategoryId(id)
  }

  @Get('search')
  @ApiOperation({ summary: 'Obtener publicaciones con paginación y ordenadas' })
  @ApiQuery({
    name: 'params',
    required: false,
    description: 'Parámetros de búsqueda y paginación'
  })
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

  @Get('model/:id')
  @ApiOperation({ summary: 'Obtener el modelo de vista de una publicación' })
  @ApiParam({ name: 'id', required: true, description: 'ID de la publicación' })
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

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una publicación' })
  @ApiParam({ name: 'id', required: true, description: 'ID de la publicación' })
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({ type: UpdatePublicationDto })
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
    @UploadedFile() file: Express.Multer.File,
    @Body() updatePublicationDto: UpdatePublicationDto
  ): Promise<Publication> {
    return await this.publicationService.update(id, updatePublicationDto, file)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una publicación' })
  @ApiParam({ name: 'id', required: true, description: 'ID de la publicación' })
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
