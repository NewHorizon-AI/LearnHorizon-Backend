import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

// Importacion de los Data Transfer Objects (DTO)
import { CreatePublicationDto } from 'src/dto/publication/create-publication.dto'
import { UpdatePublicationDto } from 'src/dto/publication/update-publication.dto'
import { FindParamsDto } from 'src/dto/publication/queries/findParams.dto'

// Importacion del modelo de la base de datos
import { Publication } from 'src/schemas/publication.schema'

// import { ConflictException, NotFoundException } from '@nestjs/common'

// Import de CategoryService
import { CategoryService } from 'src/modules/category/category.service'

// Importacion de las interfaces para las respuestas
import { IContentModel } from 'src/interfaces/responses/content.model.interface'

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
  // http://localhost:3001/publications/search?page=0&pageSize=5&order=descendant
  async findPaginatedAndOrdered(
    params: FindParamsDto
  ): Promise<IContentModel[]> {
    const { page, pageSize, order } = params
    try {
      const sortOrder = order === 'descendant' ? -1 : 1
      const skipAmount = page * pageSize

      const results = (await this.publicationModel
        .find()
        .sort({ publicationDate: sortOrder })
        .select('_id title photo description views publicationDate')
        .populate('author', 'name image')
        .populate('category', 'title')
        .skip(skipAmount)
        .limit(pageSize)
        .exec()) as IContentModel[]

      return results
    } catch (error) {
      console.error(
        `Failed to fetch paginated publications on page ${page} with size ${pageSize}`,
        error
      )
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
