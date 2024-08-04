// import { Injectable, BadRequestException } from '@nestjs/common'

// // * (1) Importar Esquemas
// import { ArticleModel } from '../schemas/article-model.schema'
// import { ModelTransformation } from './schemas/model-transformation.schema'

// import { ArticleModelService } from './article-model.service'
// import { ModelTransformationService } from './model-transformation.service'
// import { CreateArticleModelEntryDto } from './dto/create-article-model-entry.dto'
// import { CreateModelTransformationDto } from './dto/create-model-transformation.dto'

// @Injectable()
// export class ArticleModelCompositeService {
//   constructor(
//     private readonly articleModelService: ArticleModelService,
//     private readonly modelTransformationService: ModelTransformationService
//   ) {}

//   async createArticleModelWithTransformation(
//     createArticleModelEntryDto: CreateArticleModelEntryDto,
//     createModelTransformationDto: CreateModelTransformationDto
//   ): Promise<{
//     articleModel: ArticleModel
//     modelTransformation: ModelTransformation
//   }> {
//     try {
//       // Crear ArticleModel
//       const articleModel = await this.articleModelService.create(
//         createArticleModelEntryDto
//       )

//       // Crear ModelTransformation usando el ID del ArticleModel recién creado
//       createModelTransformationDto.article_model_id = articleModel._id as string
//       const modelTransformation = await this.modelTransformationService.create(
//         createModelTransformationDto
//       )

//       return { articleModel, modelTransformation }
//     } catch (error) {
//       throw new BadRequestException(error.message)
//     }
//   }
// }
