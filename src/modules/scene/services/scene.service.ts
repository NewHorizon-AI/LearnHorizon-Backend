import { Injectable, NotFoundException } from '@nestjs/common'

import { CreateSceneSettingsDto } from '../dtos/scene-dto/create-scene-settings.dto'
import { UpdateSceneSettingsDto } from '../dtos/scene-dto/update-scene-settings.dto'

// * Importar Recursos de la Escena
import { CameraSettingsService } from '../resources/camera-settings.resource'
import { GridSettingsService } from '../resources/grid-settings.resource'
import { ModelSettingsService } from '../resources/model-settings.resource'
import { TransformationsSettingsService } from '../resources/transformation-settings.resource'

// * Importart Esquema de Ajustes de Escena
import { GridSettings } from '../schemas/grid-settings.schema'

import { SceneSettingsService } from '../resources/scene-settings.resource'
import { ArticleService } from 'src/modules/articles-v2/services/article.service'

import { ModelSettings } from '../schemas/model-settings.schema'
import { CameraSettings } from '../schemas/camera-settings.schema'
import { TransformationsSettings } from '../schemas/transformations-settings.schema'
import { SceneSettings } from '../schemas/scene-settings.schema'
import { Types } from 'mongoose'

@Injectable()
export class SceneService {
  constructor(
    private readonly modelSettings: ModelSettingsService,
    private readonly cameraSettings: CameraSettingsService,
    private readonly transformationSettings: TransformationsSettingsService,
    private readonly gridSettings: GridSettingsService,
    private readonly sceneSettings: SceneSettingsService,

    private readonly articleService: ArticleService
  ) {}

  // Crear un nuevo ajuste de escena utilizando el DTO combinado
  async createDefault(createSceneSettingsDto: CreateSceneSettingsDto) {
    // TODO: Implementar Transacciones

    const articleId = createSceneSettingsDto.articleId

    const article = await this.articleService.getArticleById(articleId)

    if (!article || article.sceneSettings) {
      throw new NotFoundException(
        `No se ha encontrado un artículo con el ID: ${articleId} o ya tiene ajustes de escena`
      )
    }

    const createdGridSettings: GridSettings = await this.gridSettings.create(
      createSceneSettingsDto.gridSettings
    )

    const createdModelSettings: ModelSettings = await this.modelSettings.create(
      createSceneSettingsDto.modelSettings
    )
    const createdCameraSettings: CameraSettings =
      await this.cameraSettings.create(createSceneSettingsDto.cameraSettings)

    const createdTransformationSettings: TransformationsSettings =
      await this.transformationSettings.create(
        createSceneSettingsDto.transformationsSettings
      )

    // new Types.ObjectId(createdRole._id as string)

    const sceneSettings = await this.sceneSettings.create({
      gridSettings: new Types.ObjectId(createdGridSettings._id as string),
      modelSettings: new Types.ObjectId(createdModelSettings._id as string),
      cameraSettings: new Types.ObjectId(createdCameraSettings._id as string),
      transformationsSettings: new Types.ObjectId(
        createdTransformationSettings._id as string
      )
    })

    this.articleService.assignSceneSettingsToArticle(
      articleId,
      sceneSettings.id
    )

    console.log(article.sceneSettings)

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

  // // Actualizar un ajuste de escena por su ID
  // async update(
  //   id: string,
  //   updateSceneSettingsDto: UpdateSceneSettingsDto
  // ): Promise<GridSettings> {
  //   const updatedGridSetting = await this.gridSettingsModel
  //     .findByIdAndUpdate(id, updateSceneSettingsDto.gridSettings, { new: true })
  //     .exec()
  //   if (!updatedGridSetting) {
  //     throw new NotFoundException(`Scene setting with ID ${id} not found`)
  //   }
  //   // Puedes agregar lógica aquí para actualizar otros aspectos de la escena
  //   return updatedGridSetting
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
