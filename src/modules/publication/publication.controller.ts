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
import { ConflictException, NotFoundException } from '@nestjs/common'

// Importacion de los Data Transfer Objects (DTO)
import { CreatePublicationDto } from 'src/dto/publication/create-publication.dto'
import { UpdatePublicationDto } from 'src/dto/publication/update-publication.dto'
import { FindParamsDto } from 'src/dto/publication/queries/findParams.dto'

// Import de CategoryService
import { CategoryService } from 'src/modules/category/category.service'

import { PublicationCard } from 'src/interface/IBackend'

@Controller('publications')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}
  private readonly categoryService: CategoryService

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createPublicationDto: CreatePublicationDto
  ): Promise<Publication> {
    try {
      const publication =
        await this.publicationService.create(createPublicationDto)
      await this.categoryService.incrementPublicationCount(
        createPublicationDto.category
      )
      return publication
    } catch (error) {
      // console.log(createPublicationDto)
      throw new ConflictException('Publication already exists')
    }
  }

  @Get()
  async findAll(): Promise<Publication[]> {
    return this.publicationService.findAll()
  }

  @Get('publication/:id')
  async findOne(@Param('id') id: string): Promise<Publication> {
    const publication = await this.publicationService.findOne(id)
    if (!publication) {
      throw new NotFoundException('Publication not found')
    }
    return publication
  }

  @Get('category/:id')
  async findAllByCategoryId(@Param('id') id: string): Promise<Publication[]> {
    const publications = await this.publicationService.findAllByCategoryId(id)
    if (!publications) {
      throw new NotFoundException('Publication not found')
    }
    return publications
  }

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

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePublicationDto: UpdatePublicationDto
  ): Promise<Publication> {
    const publication = await this.publicationService.update(
      id,
      updatePublicationDto
    )
    if (!publication) {
      throw new NotFoundException('Publication not found')
    }
    return publication
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    const publication = await this.publicationService.delete(id)
    await this.categoryService.decrementPublicationCount(
      publication.category.toString()
    )
    if (!publication) {
      throw new NotFoundException('Publication not found')
    }
  }
}
