import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

// Importacion de Dtos
import { CreateModelTransformationDto } from '../../../dtos/file/model-transformation/create-model-transformation.dto'
import { UpdateModelTransformationDto } from '../../../dtos/file/model-transformation/update-model-transformation.dto'

// Importacion de Esquemas

import { ModelTransformation } from '../../../schemas/model-transformation.schema'

@Injectable()
export class ModelTransformationService {
  constructor(
    @InjectModel(ModelTransformation.name)
    private modelTransformationModel: Model<ModelTransformation>
  ) {}

  async createModelTransformation(
    createModelTransformationDto: CreateModelTransformationDto
  ): Promise<ModelTransformation> {
    const newModelTransformation = new this.modelTransformationModel(
      createModelTransformationDto
    )
    return newModelTransformation.save()
  }

  async findAllModelTransformations(): Promise<ModelTransformation[]> {
    return this.modelTransformationModel.find().exec()
  }

  async findModelTransformationById(id: string): Promise<ModelTransformation> {
    const modelTransformation = await this.modelTransformationModel
      .findById(id)
      .exec()
    if (!modelTransformation) {
      throw new NotFoundException(`ModelTransformation with ID ${id} not found`)
    }
    return modelTransformation
  }

  async updateModelTransformation(
    id: string,
    updateModelTransformationDto: UpdateModelTransformationDto
  ): Promise<ModelTransformation> {
    const updatedModelTransformation = await this.modelTransformationModel
      .findByIdAndUpdate(id, updateModelTransformationDto, { new: true })
      .exec()
    if (!updatedModelTransformation) {
      throw new NotFoundException(`ModelTransformation with ID ${id} not found`)
    }
    return updatedModelTransformation
  }

  async deleteModelTransformation(id: string): Promise<ModelTransformation> {
    const deletedModelTransformation = await this.modelTransformationModel
      .findByIdAndDelete(id)
      .exec()
    if (!deletedModelTransformation) {
      throw new NotFoundException(`ModelTransformation with ID ${id} not found`)
    }
    return deletedModelTransformation
  }
}
