import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreatePublicationDto } from 'src/dto/publication/create-publication.dto'
import { UpdatePublicationDto } from 'src/dto/publication/update-publication.dto'
import { Publication } from 'src/schemas/publication.schema'

@Injectable()
export class PublicationService {
  constructor(
    @InjectModel(Publication.name) private publicationModel: Model<Publication>
  ) {}

  async create(
    createPublicationDto: CreatePublicationDto
  ): Promise<Publication> {
    const createdPublication = new this.publicationModel(createPublicationDto)
    return createdPublication.save()
  }

  async findAll(): Promise<Publication[]> {
    return this.publicationModel.find().exec()
  }

  async findOne(id: string): Promise<Publication> {
    return this.publicationModel.findById(id).exec()
  }

  async update(
    id: string,
    updatePublicationDto: UpdatePublicationDto
  ): Promise<Publication> {
    return this.publicationModel
      .findByIdAndUpdate(id, updatePublicationDto, { new: true })
      .exec()
  }

  async delete(id: string): Promise<Publication> {
    return this.publicationModel.findByIdAndDelete(id).exec()
  }
}
