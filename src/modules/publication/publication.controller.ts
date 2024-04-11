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

@Controller('publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createPublicationDto: CreatePublicationDto
  ): Promise<Publication> {
    try {
      return await this.publicationService.create(createPublicationDto)
    } catch (error) {
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
    if (!publication) {
      throw new NotFoundException('Publication not found')
    }
  }
}
