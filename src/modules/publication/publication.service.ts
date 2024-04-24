import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreatePublicationDto } from 'src/dto/publication/create-publication.dto'
import { UpdatePublicationDto } from 'src/dto/publication/update-publication.dto'
import { Publication } from 'src/schemas/publication.schema'

@Injectable()
export class PublicationService {
  // Inyección del modelo de la base de datos

  constructor(
    @InjectModel(Publication.name) private publicationModel: Model<Publication>
  ) {}

  // Metodo para crear publicaciones
  async create(
    createPublicationDto: CreatePublicationDto
  ): Promise<Publication> {
    const createdPublication = new this.publicationModel(createPublicationDto)
    return createdPublication.save()
  }

  // Metodos para obtener publicaciones

  // Metodo para obtener todas las publicaciones
  async findAll(): Promise<Publication[]> {
    return this.publicationModel.find().exec()
  }

  // Metodo para obtener una publicación por id
  async findOne(id: string): Promise<Publication> {
    return this.publicationModel.findById(id).exec()
  }

  // Metodo para obtener todas las publicaciones por id de categoría
  async findAllByCategoryId(id: string): Promise<Publication[]> {
    return this.publicationModel.find({ id }).exec()
  }

  // Metodo para obtener publicaciones con paginación
  async findPaginatedAndOrdered(
    page: number,
    pageSize: number,
    order: 'ascendant' | 'descendant'
  ): Promise<Publication[]> {
    let query = this.publicationModel.find()

    if (order === 'descendant') {
      query = query.sort({ publicationDate: -1 }) // Ordenar por fecha de publicación descendente
    } else if (order === 'ascendant') {
      query = query.sort({ publicationDate: 1 }) // Ordenar por fecha de publicación ascendente
    }

    // Seleccionar solo los campos necesarios
    query = query.select(
      '_id title photo description author views publicationDate'
    )

    return await query
      .skip(page * pageSize)
      .limit(pageSize)
      .exec() // Ejecutar la consulta
  }

  // Meodo para actualizar publicaciones

  async update(
    id: string,
    updatePublicationDto: UpdatePublicationDto
  ): Promise<Publication> {
    return this.publicationModel
      .findByIdAndUpdate(id, updatePublicationDto, { new: true })
      .exec()
  }

  // Metodo para eliminar publicaciones

  async delete(id: string): Promise<Publication> {
    return this.publicationModel.findByIdAndDelete(id).exec()
  }
}
