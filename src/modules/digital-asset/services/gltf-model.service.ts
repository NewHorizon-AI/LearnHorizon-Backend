import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { GltfModelAssetResourceService } from '../resources/gltf-model-asset-resource.service'
import { CreateGltfModelAssetDto } from '../dtos/gltf-model-asset/create-gltf-model-asset.dto'
import { UpdateGltfModelAssetDto } from '../dtos/gltf-model-asset/update-gltf-model-asset.dto'
import { Express } from 'express'
import { GltfModelAsset } from '../schemas/gltf-model-asset.schema'

import { ArticleService } from 'src/modules/articles/services/article.service'

@Injectable()
export class GltfModelService {
  constructor(
    @Inject(forwardRef(() => ArticleService))
    private articleService: ArticleService,
    private readonly gltfModelAssetResourceService: GltfModelAssetResourceService
  ) {}

  // Crear un nuevo modelo GLTF
  async createModel(
    createGltfModelAssetDto: CreateGltfModelAssetDto
  ): Promise<GltfModelAsset> {
    return this.gltfModelAssetResourceService.create(createGltfModelAssetDto)
  }

  // Crear un nuevo modelo GLTF desde un archivo
  async createModelFromFile(
    articleId: string,
    file: Express.Multer.File
  ): Promise<GltfModelAsset> {
    const article = await this.articleService.getArticleById(articleId)

    if (!article) {
      throw new NotFoundException(`El Artículo con ID ${articleId} no existe`)
    }

    const createdModel =
      await this.gltfModelAssetResourceService.createFromFile(file)

    if (!createdModel) {
      throw new NotFoundException('El Modelo no pudo ser creado')
    }

    // Agregar el ID del modelo al artículo

    this.articleService.assignModelsToArticle(articleId, [createdModel.id])

    return createdModel
  }

  // Obtener todos los modelos GLTF
  async getAllModels(): Promise<GltfModelAsset[]> {
    return this.gltfModelAssetResourceService.findAll()
  }

  // Obtener un modelo GLTF por ID
  async getModelById(id: string): Promise<GltfModelAsset> {
    return this.gltfModelAssetResourceService.findOne(id)
  }

  async getModelByArticleId(articleId: string): Promise<GltfModelAsset> {
    const article = await this.articleService.getArticleById(articleId)

    if (!article.models || article.models.length === 0) {
      throw new NotFoundException(
        `El Artículo con ID ${articleId} no tiene modelos`
      )
    }

    const articleModels = article.models[0].toString()

    const models =
      await this.gltfModelAssetResourceService.findByArticleId(articleModels)

    return models
  }

  // Actualizar un modelo GLTF por ID
  async updateModel(
    id: string,
    updateGltfModelAssetDto: UpdateGltfModelAssetDto
  ): Promise<GltfModelAsset> {
    return this.gltfModelAssetResourceService.update(
      id,
      updateGltfModelAssetDto
    )
  }

  // Eliminar un modelo GLTF por ID
  async deleteModel(id: string): Promise<GltfModelAsset> {
    return this.gltfModelAssetResourceService.remove(id)
  }
}
