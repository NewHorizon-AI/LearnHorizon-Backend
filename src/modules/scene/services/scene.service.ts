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
import { CameraSettingsService } from '../resources/camera-settings.resource'
import { TransformationsSettingsService } from '../resources/transformation-settings.resource'
import { GridSettingsService } from '../resources/grid-settings.resource'
import { ModelSettingsService } from '../resources/model-settings.resource'

import { ArticleService } from 'src/modules/articles-v2/services/article.service'

@Injectable()
export class SceneService {
  constructor(
    @Inject(forwardRef(() => ArticleService))
    private readonly articleService: ArticleService,
    private readonly sceneSettings: SceneSettingsService,
    private readonly cameraSettingsService: CameraSettingsService,
    private readonly transformationService: TransformationsSettingsService,
    private readonly gridSettingsService: GridSettingsService,
    private readonly modelSettingsService: ModelSettingsService
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

  // // Eliminar un ajuste de escena por su ID
  // async remove(id: string): Promise<GridSettings> {
  //   const deletedGridSetting = await this.gridSettingsModel
  //     .findByIdAndDelete(id)
  //     .exec()
  //   if (!deletedGridSetting) {
  //     throw new NotFoundException(`Scene setting with ID ${id} not found`)
  //   }
  //   // Aquí podrías agregar lógica para eliminar otros elementos relacionados con la escena
  //   return deletedGridSetting
  // }
}
