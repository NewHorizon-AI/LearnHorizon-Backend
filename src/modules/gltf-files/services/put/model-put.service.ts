import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { UpdateModelCompleteDto } from '../../dto/update-model-complete.dto.ts'

import { ArticleModelEntry } from '../../schemas/article-model-entry.schema'
import { GltfFile } from '../../schemas/gltf-file.schema'
import { ModelTransformation } from '../../schemas/model-transformation.schema'

@Injectable()
export class ModelPutService {
  constructor(
    @InjectModel(ArticleModelEntry.name)
    private readonly articleModelEntryModel: Model<ArticleModelEntry>,
    @InjectModel(GltfFile.name) private readonly gltfFileModel: Model<GltfFile>,
    @InjectModel(ModelTransformation.name)
    private readonly modelTransformationModel: Model<ModelTransformation>
  ) {}

  async updateComplete(
    id: string,
    updateModelCompleteDto: UpdateModelCompleteDto
  ): Promise<void> {
    const { articleModelEntry, gltfFile, modelTransformation } =
      updateModelCompleteDto

    const existingArticleModelEntry =
      await this.articleModelEntryModel.findById(id)
    if (!existingArticleModelEntry) {
      throw new NotFoundException('Model not found')
    }
    if (articleModelEntry) {
      Object.assign(existingArticleModelEntry, articleModelEntry)
      await existingArticleModelEntry.save()
    }

    if (gltfFile) {
      await this.gltfFileModel
        .findOneAndUpdate(
          { model_id: id },
          { ...gltfFile, model_id: id },
          { upsert: true }
        )
        .exec()
    }

    if (modelTransformation) {
      await this.modelTransformationModel
        .findOneAndUpdate(
          { model_id: id },
          { ...modelTransformation, model_id: id },
          { upsert: true }
        )
        .exec()
    }
  }
}
