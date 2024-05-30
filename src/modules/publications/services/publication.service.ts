import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

// Importacion de los Data Transfer Objects (DTO)
import { CreatePublicationDto } from 'src/modules/publications/dto/create-publication.dto'
import { UpdatePublicationDto } from 'src/modules/publications/dto/update-publication.dto'
import { FindParamsDto } from 'src/modules/publications/dto/query-parameters/find-params.dto'
// import { CreateObject3DDto } from 'src/modules/objects3d/dto/create-object3d.dto'

// Importacion del modelo de la base de datos
import { Publication } from 'src/modules/publications/schemas/publication.schema'

// import { ConflictException, NotFoundException } from '@nestjs/common'

// Import de CategoryService
import { CategoryService } from 'src/modules/categories/services/category.service'

// Importación del servicio de modelos 3D
// import { Object3DService } from 'src/modules/objects3d/services/object3d.service'

// Importacion de las interfaces para las respuestas
import { PublicationResponse } from 'src/interfaces/responses/content-model.model'
import { ArticlePublication } from 'src/interfaces/responses/article-publication.model'

// throw new MyCustomException('Duplicate entry');

@Injectable()
export class PublicationService {
  // Inyección del modelo de la base de datos
  constructor(
    @InjectModel(Publication.name) private publicationModel: Model<Publication>,
    private categoryService: CategoryService
    // private object3DService: Object3DService // Inyectar el servicio de modelos 3D
  ) {}

  // Metodo para crear publicaciones y actualizar el contador de publicaciones de la categoría
  async create(
    createPublicationDto: CreatePublicationDto
    // createObject3DDto: CreateObject3DDto
  ): Promise<Publication> {
    try {
      // Si hay un archivo, crear el modelo 3D y obtener su ID
      // if (createObject3DDto) {
      //   const model3D = await this.object3DService.create(createObject3DDto)
      // }

      // Crear la publicación con la posible referencia al modelo 3D
      const createdPublication = new this.publicationModel({
        ...createPublicationDto
      })

      // Regla de negocio: Incrementar el contador de publicaciones en las categorías
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
  ): Promise<PublicationResponse[]> {
    const { page, pageSize, order } = params
    try {
      const sortOrder = order === 'descendant' ? -1 : 1
      const skipAmount = page * pageSize

      const results = await this.publicationModel
        .find()
        .sort({ publicationDate: sortOrder })
        .select(
          '_id title photo description views publicationDate author category'
        )
        .populate('author', 'name image')
        .populate('category', 'title')
        .skip(skipAmount)
        .limit(pageSize)
        .exec()

      return results.map((result) => {
        // Convertir el documento de Mongoose a un objeto JavaScript simple
        const resultObject = result.toObject()

        // Crear una instancia de PublicationResponse y asignar las propiedades
        const contentModel = new PublicationResponse()
        Object.assign(contentModel, resultObject)

        return contentModel
      })
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

  // Metodo para obtener la informacion necesaria para la vista de un articulo
  async findPublicationModel(id: string): Promise<ArticlePublication> {
    try {
      const result = await this.publicationModel
        .findById(id)
        .select(
          '_id title photo subtitle description markdownContent tags publicationDate views likes dislikes'
        )
        .populate({
          path: 'author',
          model: 'User',
          select: 'image name followers'
        })
        .populate({
          path: 'category',
          model: 'Category',
          select: 'title publicationCount'
        })
        .exec()

      if (!result) {
        throw new Error('Publication not found')
      }

      // Convertir el documento de Mongoose a un objeto JavaScript simple
      const resultObject = result.toObject()

      // Crear una instancia de ArticlePublication y asignar las propiedades
      const publication = new ArticlePublication()
      Object.assign(publication, resultObject)

      return publication
    } catch (error) {
      throw new Error(`Publication not found: ${error.message}`)
    }
  }

  // Meodo para actualizar publicaciones
  async update(
    id: string,
    updatePublicationDto: UpdatePublicationDto
  ): Promise<Publication> {
    try {
      // Actualizar la publicación con la posible referencia al modelo 3D
      const updatedPublication = await this.publicationModel
        .findByIdAndUpdate(
          id,
          {
            ...updatePublicationDto
          },
          { new: true }
        )
        .exec()

      if (!updatedPublication) {
        throw new Error('Publication not found')
      }

      return updatedPublication
    } catch (error) {
      throw new Error(`Publication not updated: ${error.message}`)
    }
  }

  // Metodo para eliminar publicaciones
  async delete(id: string): Promise<Publication> {
    try {
      // Encuentra la publicación por su ID
      const publication = await this.publicationModel.findById(id).exec()

      if (!publication) {
        throw new Error('Publication not found')
      }

      // Extrae los IDs de las categorías asociadas a la publicación
      const categoryIds = publication.category.map((category: any) =>
        category._id.toString()
      )

      // Decrementa el contador de publicaciones en las categorías
      await this.categoryService.decrementPublicationCount(categoryIds)

      // Elimina la publicación y retorna el documento eliminado
      return await this.publicationModel.findByIdAndDelete(id).exec()
    } catch (error) {
      throw new Error(`Publication not deleted: ${error.message}`)
    }
  }
}
