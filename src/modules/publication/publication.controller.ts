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
import { Publication } from 'src/schemas/publication.schema'
import { PublicationService } from './publication.service'

// Importacion de los Data Transfer Objects (DTO)
import { CreatePublicationDto } from 'src/dto/publication/create-publication.dto'
import { UpdatePublicationDto } from 'src/dto/publication/update-publication.dto'
import { FindParamsDto } from 'src/dto/publication/queries/findParams.dto'

import { PublicationCard } from 'src/interface/IBackend'

@Controller('publications')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  // Metodo para crear una publicación
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createPublicationDto: CreatePublicationDto
  ): Promise<Publication> {
    return await this.publicationService.create(createPublicationDto)
  }

  // Metodo para obtener todas las publicaciones
  @Get()
  async findAll(): Promise<Publication[]> {
    return this.publicationService.findAll()
  }

  // Metodo para obtener una publicación por id
  @Get('publication/:id')
  async findOne(@Param('id') id: string): Promise<Publication> {
    return await this.publicationService.findOne(id)
  }

  // Metodo para obtener todas las publicaciones por id de categoría
  @Get('category/:id')
  async findAllByCategoryId(@Param('id') id: string): Promise<Publication[]> {
    return await this.publicationService.findAllByCategoryId(id)
  }

  // Metodo para obtener publicaciones con paginación
  @Get('search')
  async findPaginatedAndOrdered(
    @Query() params: FindParamsDto
  ): Promise<PublicationCard[]> {
    return this.publicationService.findPaginatedAndOrdered(
      params.page,
      params.pageSize,
      params.order
    )
  }

  // Metodo para actualizar una publicación
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePublicationDto: UpdatePublicationDto
  ): Promise<Publication> {
    return await this.publicationService.update(id, updatePublicationDto)
  }

  // Metodo para eliminar una publicación
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.publicationService.delete(id)
  }
}
