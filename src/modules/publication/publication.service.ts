import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Query } from 'mongoose'

// Importacion de los Data Transfer Objects (DTO)
import { CreatePublicationDto } from 'src/dto/publication/create-publication.dto'
import { UpdatePublicationDto } from 'src/dto/publication/update-publication.dto'
import { ContentCardDto } from 'src/dto/publication/responses/content-publication.dto'

// Importacion del modelo de la base de datos
import { Publication } from 'src/schemas/publication.schema'

// import { ConflictException, NotFoundException } from '@nestjs/common'

// Import de CategoryService
import { CategoryService } from 'src/modules/category/category.service'

@Injectable()
export class PublicationService {
  // Inyección del modelo de la base de datos
  constructor(
    @InjectModel(Publication.name) private publicationModel: Model<Publication>,
    private categoryService: CategoryService
  ) {}

  // Metodo para crear publicaciones y actualizar el contador de publicaciones de la categoría
  async create(
    createPublicationDto: CreatePublicationDto
  ): Promise<Publication> {
    try {
      const createdPublication = new this.publicationModel(createPublicationDto)
      await this.categoryService.incrementPublicationCount([
        ...createPublicationDto.category
      ])
      return await createdPublication.save()
    } catch (error) {
      throw new Error(`Publication not created: ${error.message}`)
    }
  }

  // Metodo para obtener todas las publicaciones
  async findAll(): Promise<Publication[]> {
    try {
      return this.publicationModel.find().exec()
    } catch (error) {
      throw new Error(`Publications not found: ${error.message}`)
    }
  }

  // Metodo para obtener una publicación por id
  async findOne(id: string): Promise<Publication> {
    try {
      return this.publicationModel.findById(id).exec()
    } catch (error) {
      throw new Error(`Publication not found: ${error.message}`)
    }
  }

  // Metodo para obtener todas las publicaciones por id de categoría
  async findAllByCategoryId(id: string): Promise<Publication[]> {
    try {
      return this.publicationModel.find({ id }).exec()
    } catch (error) {
      throw new Error(`Publications not found: ${error.message}`)
    }
  }

  // Metodo para obtener publicaciones con paginación
  async findPaginatedAndOrdered(
    page: number,
    pageSize: number,
    order: 'ascendant' | 'descendant'
  ): Promise<ContentCardDto[]> {
    try {
      let query: Query<ContentCardDto[], ContentCardDto> =
        this.publicationModel.find()

      // Ordenamiento basado en el parámetro
      query = query.sort({ publicationDate: order === 'descendant' ? -1 : 1 })

      // Seleccionar y poblar campos necesarios
      query = query
        .select('_id title photo description views publicationDate')
        .populate('author', 'name image') // Asegúrate de que el path y select estén correctamente definidos

      // Paginar los resultados
      const results = (await query
        .skip(page * pageSize)
        .limit(pageSize)
        .exec()) as any as ContentCardDto[] // Aserción de tipo para forzar el tipo correcto

      return results
    } catch (error) {
      throw new Error(
        `Error finding paginated and ordered publications: ${error.message}`
      )
    }
  }

  // Meodo para actualizar publicaciones
  async update(
    id: string,
    updatePublicationDto: UpdatePublicationDto
  ): Promise<Publication> {
    try {
      return this.publicationModel
        .findByIdAndUpdate(id, updatePublicationDto, { new: true })
        .exec()
    } catch (error) {
      throw new Error(`Publication not updated: ${error.message}`)
    }
  }

  // Metodo para eliminar publicaciones
  async delete(id: string): Promise<Publication> {
    try {
      const publication = await this.publicationModel.findById(id).exec()

      if (!publication) {
        throw new Error('Publication not found')
      }

      const categoryIds = publication.category.map((category) => category._id)
      await this.categoryService.decrementPublicationCount(categoryIds)

      return await this.publicationModel.findByIdAndDelete(id).exec()
    } catch (error) {
      throw new Error(`Publication not deleted: ${error.message}`)
    }
  }
}
