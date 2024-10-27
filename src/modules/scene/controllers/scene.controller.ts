import { Controller, Get, Patch, Param, Body } from '@nestjs/common'

import { ApiTags, ApiOperation } from '@nestjs/swagger'

import { SceneService } from '../services/scene.service'

import { PatchSceneSettingsDto } from '../dtos/patch-scene.dto'

import { SceneSettings } from '../schemas/scene-settings.schema'

@ApiTags('Scene Settings')
@Controller('scene-settings')
export class SceneSettingsController {
  constructor(private readonly sceneService: SceneService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los ajustes de escena' })
  async findAll(): Promise<SceneSettings[]> {
    // Cambiado a SceneSettings[]
    return this.sceneService.findAll()
  }

  @Get(':articleId')
  @ApiOperation({ summary: 'Obtener ajustes de escena por el Id del articulo' })
  async findOnebyArticleId(
    @Param('articleId') articleId: string
  ): Promise<SceneSettings> {
    return this.sceneService.findOneByArticleId(articleId)
  }

  // * Actualizar escena por Id del artículo
  @Patch(':articleId')
  @ApiOperation({ summary: 'Actualizar un ajuste de escena por ID' })
  async update(
    @Param('articleId') articleId: string,
    @Body() updateScene: PatchSceneSettingsDto
  ): Promise<SceneSettings> {
    return this.sceneService.updatepPatchScene(articleId, updateScene)
  }
}
