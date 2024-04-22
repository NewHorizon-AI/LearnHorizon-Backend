import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put
} from '@nestjs/common'
import { CreatePublicationDto } from 'src/dto/publication/create-publication.dto'
import { UpdatePublicationDto } from 'src/dto/publication/update-publication.dto'
import { Publication } from 'src/schemas/publication.schema'
import { PublicationService } from './publication.service'
import { ConflictException, NotFoundException } from '@nestjs/common'

// Import de CategoryService
import { CategoryService } from 'src/modules/category/category.service'

@Controller('publication')
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

  @Get(':id')
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
