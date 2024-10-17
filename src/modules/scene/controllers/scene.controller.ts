import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException
} from '@nestjs/common'

import { ApiTags, ApiOperation } from '@nestjs/swagger'

import { SceneService } from '../services/scene.service'

import { CreateSceneSettingsDto } from '../dtos/scene-dto/create-scene-settings.dto'

import { SceneSettings } from '../schemas/scene-settings.schema'

@ApiTags('Scene Settings') // Este decorador es para agruparlo en la documentación de Swagger
@Controller('scene-settings') // Ruta base para el controlador
export class SceneSettingsController {
  constructor(private readonly sceneService: SceneService) {}

  // ? Crear un nuevo ajuste de escena
  @Post('/default')
  @ApiOperation({ summary: 'Crear un nuevo ajuste de escena' })
  async create(@Body() createSceneSettingsDto: CreateSceneSettingsDto) {
    return this.sceneService.createDefault(createSceneSettingsDto)
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los ajustes de escena' })
  async findAll(): Promise<SceneSettings[]> {
    // Cambiado a SceneSettings[]
    return this.sceneService.findAll()
  }

  // ? Obtener todos los ajustes de escena dado un ID de escena
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un ajuste de escena por ID' })
  async findOne(@Param('id') id: string): Promise<SceneSettings> {
    try {
      return this.sceneService.findOne(id)
    } catch (error) {
      throw new NotFoundException(
        `La escena con el ID: ${id} no se ha encontrado`
      )
    }
  }

  // @Patch(':id')
  // @ApiOperation({ summary: 'Actualizar un ajuste de escena por ID' })
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateSceneSettingsDto: UpdateSceneSettingsDto
  // ): Promise<SceneSettings> {
  //   // Cambiado a SceneSettings
  //   return this.sceneService.update(id, updateSceneSettingsDto)
  // }

  // @Delete(':id')
  // @ApiOperation({ summary: 'Eliminar un ajuste de escena por ID' })
  // async remove(@Param('id') id: string): Promise<SceneSettings> {
  //   // Cambiado a SceneSettings
  //   return this.sceneService.remove(id)
  // }
}
