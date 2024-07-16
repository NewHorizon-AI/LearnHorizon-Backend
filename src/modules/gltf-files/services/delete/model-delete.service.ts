import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { ArticleModelEntry } from '../../schemas/article-model-entry.schema'
import { GltfFile } from '../../schemas/gltf-file.schema'
import { ModelTransformation } from '../../schemas/model-transformation.schema'

@Injectable()
export class ModelDeleteService {
  constructor(
    @InjectModel(ArticleModelEntry.name)
    private readonly articleModelEntryModel: Model<ArticleModelEntry>,
    @InjectModel(GltfFile.name) private readonly gltfFileModel: Model<GltfFile>,
    @InjectModel(ModelTransformation.name)
    private readonly modelTransformationModel: Model<ModelTransformation>
  ) {}

  async remove(id: string): Promise<void> {
    const articleModelEntry = await this.articleModelEntryModel
      .findById(id)
      .exec()
    if (!articleModelEntry) {
      throw new NotFoundException(`Model with id ${id} not found`)
    }

    await this.articleModelEntryModel.findByIdAndDelete(id).exec()
    await this.gltfFileModel.deleteMany({ model_id: id }).exec()
    await this.modelTransformationModel.deleteMany({ model_id: id }).exec()
  }
}
