import { Module } from '@nestjs/common'
import { CategoryController } from './controllers/category.controller'
import { CategoryService } from './services/category.service'
import { MongooseModule } from '@nestjs/mongoose'
import {
  Category,
  CategorySchema
} from 'src/modules/categories/schemas/category.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])
  ], // Importar el modelo de la base de datos
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [MongooseModule, CategoryService] // Exportar el módulo de Mongoose
})
export class CategoryModule {}
