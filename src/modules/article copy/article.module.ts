import { Module } from '@nestjs/common'
import { PublicationController } from './controllers/publication.controller'
import { PublicationService } from './services/publication.service'
import { MongooseModule } from '@nestjs/mongoose'
import {
  Publication,
  PublicationSchema
} from 'src/modules/publications/schemas/publication.schema'

import { CategoryService } from 'src/modules/categories/services/category.service'
import { CategoryModule } from 'src/modules/categories/category.module'
import { Object3dModule } from '../objects3d/object3d.module'

// import { Object3DService } from '../objects3d/services/object3d.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Publication.name, schema: PublicationSchema }
    ]),
    CategoryModule,
    Object3dModule
  ], // Importar el modelo de la base de datos
  controllers: [PublicationController],
  providers: [PublicationService, CategoryService], // , Object3DService
  exports: [MongooseModule] // Exportar el módulo de Mongoose
})
export class PublicationModule {}
