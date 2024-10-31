import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { ArticleResourceService } from '../resources/article-resource.sevice'
import { SceneService } from 'src/modules/scene/services/scene.service'

import { CreateArticleDto } from '../dtos/create-article.dto'
import { UpdateArticleDto } from '../dtos/update-article.dto'
import { Article } from '../schema/article.schema'
import { GltfModelAsset } from 'src/modules/digital-asset/schemas/gltf-model-asset.schema'
import { GltfModelService } from 'src/modules/digital-asset/services/gltf-model.service'
import { IPaginationParams } from '../interfaces/pagination-params.interface'

@Injectable()
export class ArticleService {
  constructor(
    private articleResourceService: ArticleResourceService,
    @Inject(forwardRef(() => GltfModelService))
    private gltfModelService: GltfModelService,

    @Inject(forwardRef(() => SceneService))
    private sceneService: SceneService
  ) {}

  async createArticle(createArticleDto: CreateArticleDto): Promise<Article> {
    // ! Validar al usuario

    const createdArticle =
      await this.articleResourceService.create(createArticleDto)

    await this.sceneService.createDefault(createdArticle._id.toString())

    return this.getArticleById(createdArticle._id.toString())
  }

  async getPaginatedArticles(paginationDto: IPaginationParams) {
    return await this.articleResourceService.getPaginatedArticles(paginationDto)
  }

  async assignModelsToArticle(articleId: string, modelsIds: string[]) {
    return await this.articleResourceService.assignModelsToArticle(
      articleId,
      modelsIds
    )
  }

  async assignSceneSettingsToArticle(
    articleId: string,
    sceneSettingsId: string
  ) {
    return await this.articleResourceService.assignSceneSettingsToArticle(
      articleId,
      sceneSettingsId
    )
  }

  async getArticles(): Promise<Article[]> {
    return await this.articleResourceService.findAll()
  }

  async getArticleById(id: string): Promise<Article> {
    return await this.articleResourceService.findById(id)
  }

  async getAllArticlesByUserId(usersId: string[]): Promise<Article[]> {
    return await this.articleResourceService.findByUserId(usersId)
  }

  async getAllModelsByArticleId(articleId: string): Promise<GltfModelAsset[]> {
    return await this.articleResourceService.findGltfModelsByArticleId(
      articleId
    )
  }

  async updateArticle(
    articleId: string,
    updateArticleDto: UpdateArticleDto
  ): Promise<Article> {
    const article = await this.articleResourceService.findOne(articleId)

    if (!article) {
      throw new NotFoundException(
        `El artículo a actualizar ${articleId} no existe`
      )
    }

    return await this.articleResourceService.update(articleId, updateArticleDto)
  }

  async deleteArticle(articleId: string) {
    const article = await this.articleResourceService.findById(articleId)

    if (!article) {
      throw new NotFoundException(
        `El artículo a eliminar ${articleId} no existe`
      )
    }

    if (article.sceneSettings) {
      await this.sceneService.deleteScene(article.sceneSettings.id.toString())
    }

    if (article.models && article.models.length > 0) {
      await this.gltfModelService.deleteModel(article.models[0].toString())
    }

    await this.articleResourceService.remove(articleId)
  }
}
