import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreateModelCompleteDto } from '../../dto/create-model-complete.dto.ts'

import { ArticleModelEntry } from '../../schemas/article-model-entry.schema'
import { GltfFile } from '../../schemas/gltf-file.schema'
import { ModelTransformation } from '../../schemas/model-transformation.schema'

@Injectable()
export class ModelPostService {
  constructor(
    @InjectModel(ArticleModelEntry.name)
    private readonly articleModelEntryModel: Model<ArticleModelEntry>,
    @InjectModel(GltfFile.name) private readonly gltfFileModel: Model<GltfFile>,
    @InjectModel(ModelTransformation.name)
    private readonly modelTransformationModel: Model<ModelTransformation>
  ) {}

  async createComplete(
    createModelCompleteDto: CreateModelCompleteDto
  ): Promise<void> {
    const { articleModelEntry, gltfFile, modelTransformation } =
      createModelCompleteDto

    const createdArticleModelEntry = new this.articleModelEntryModel(
      articleModelEntry
    )
    await createdArticleModelEntry.save()

    if (gltfFile) {
      const newGltfFile = new this.gltfFileModel({
        ...gltfFile,
        model_id: createdArticleModelEntry._id
      })
      await newGltfFile.save()
    }

    if (modelTransformation) {
      const newModelTransformation = new this.modelTransformationModel({
        ...modelTransformation,
        model_id: createdArticleModelEntry._id
      })
      await newModelTransformation.save()
    }
  }
}
