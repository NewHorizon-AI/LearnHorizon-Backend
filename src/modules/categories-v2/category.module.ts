import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CategoryController } from './controllers/category.controller'
import { CategoryService } from './services/category.service'

import { Category, CategorySchema } from './schemas/category.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService]
})
export class CategoryModuleV2 {}
