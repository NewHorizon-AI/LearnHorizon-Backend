import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common'

// * Impotar DTOs
import { PatchSceneSettingsDto } from '../dtos/patch-scene.dto'

import { SceneSettings } from '../schemas/scene-settings.schema'

// * Importar Servicios
import { SceneSettingsService } from '../resources/scene-settings.resource'

import { ArticleService } from 'src/modules/articles/services/article.service'

@Injectable()
export class SceneService {
  constructor(
    @Inject(forwardRef(() => ArticleService))
    private readonly articleService: ArticleService,
    private readonly sceneSettings: SceneSettingsService
  ) {}

  // Crear un nuevo ajuste de escena utilizando el DTO combinado
  async createDefault(articleId: string) {
    // TODO: Implementar Transacciones

    const article = await this.articleService.getArticleById(articleId)

    if (!article || article.sceneSettings) {
      throw new NotFoundException(
        `No se ha encontrado un artículo con el ID: ${articleId} o ya tiene ajustes de escena`
      )
    }

    const sceneSettings = await this.sceneSettings.create()

    this.articleService.assignSceneSettingsToArticle(
      articleId,
      sceneSettings.id
    )

    return sceneSettings
  }

  // Obtener todos los ajustes de escena
  async findAll(): Promise<SceneSettings[]> {
    return await this.sceneSettings.findAll()
  }

  // Obtener un ajuste de escena por su ID
  async findOne(id: string): Promise<SceneSettings> {
    return await this.sceneSettings.findOne(id)
  }

  // Obtener un ajuste de escena por el ID del artículo
  async findOneByArticleId(articleId: string): Promise<SceneSettings> {
    const article = await this.articleService.getArticleById(articleId)

    if (!article || !article.sceneSettings) {
      throw new NotFoundException(
        `No se ha encontrado un artículo con el ID: ${articleId} o no tiene ajustes de escena`
      )
    }

    return this.sceneSettings.findById(article.sceneSettings.id.toString())
  }

  async updatepPatchScene(
    articleId: string,
    updateScene: PatchSceneSettingsDto
  ) {
    const article = await this.articleService.getArticleById(articleId)

    if (!article || !article.sceneSettings) {
      throw new NotFoundException(
        `No se ha encontrado un artículo con el ID: ${articleId} o no tiene ajustes de escena`
      )
    }

    const sceneSettingsId = article.sceneSettings._id.toString()
    const sceneSettings = await this.sceneSettings.findById(sceneSettingsId)

    if (!sceneSettings) {
      throw new NotFoundException(
        `No se encontró configuración de escena con el ID: ${sceneSettingsId}`
      )
    }

    await this.sceneSettings.update(sceneSettingsId, updateScene)

    return this.sceneSettings.findById(sceneSettingsId)
  }

  // async updateScene(articleId: string, updateScene: UpdateSceneSettingsDto) {
  //   const article = await this.articleService.getArticleById(articleId)

  //   if (!article || !article.sceneSettings) {
  //     throw new NotFoundException(
  //       `No se ha encontrado un artículo con el ID: ${articleId} o no tiene ajustes de escena`
  //     )
  //   }

  //   this.sceneSettings.update(article.sceneSettings.toString(), updateScene)
  // }

  // Eliminar un ajuste de escena por su ID
  async deleteScene(sceneId: string) {
    const sceneSettings = await this.sceneSettings.findById(sceneId)

    if (!sceneSettings) {
      throw new NotFoundException(
        `No se ha encontrado un ajuste de escena con el ID: ${sceneId}`
      )
    }

    return await this.sceneSettings.deleteScene(sceneId)
  }
}
