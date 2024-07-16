import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { ModelComplete } from '../../dto/shared/model-complete.interface'

import { ArticleModelEntry } from '../../schemas/article-model-entry.schema'
import { GltfFile } from '../../schemas/gltf-file.schema'
import { ModelTransformation } from '../../schemas/model-transformation.schema'

@Injectable()
export class ModelGetService {
  constructor(
    @InjectModel(ArticleModelEntry.name)
    private readonly articleModelEntryModel: Model<ArticleModelEntry>,
    @InjectModel(GltfFile.name) private readonly gltfFileModel: Model<GltfFile>,
    @InjectModel(ModelTransformation.name)
    private readonly modelTransformationModel: Model<ModelTransformation>
  ) {}

  async findOneComplete(id: string): Promise<ModelComplete> {
    const articleModelEntry = await this.articleModelEntryModel
      .findById(id)
      .exec()
    if (!articleModelEntry) {
      throw new NotFoundException(`Model with id ${id} not found`)
    }

    const result: ModelComplete = {
      articleModelEntry: articleModelEntry.toObject()
    }

    result.gltfFile = await this.gltfFileModel.findOne({ model_id: id }).exec()
    result.modelTransformation = await this.modelTransformationModel
      .findOne({ model_id: id })
      .exec()

    return result
  }
}
