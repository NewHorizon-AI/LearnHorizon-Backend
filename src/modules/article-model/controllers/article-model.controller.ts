import { Controller, Post, Body } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

// * (1) Importar Esquemas
// import { ArticleModel } from '../schemas/article-model.schema'
// import { ModelTransformation } from '../schemas/article-model-transformation.schema'

// * (2) Importar Dtos
import { CreateArticleModelDto } from '../dtos/article-model/create-article-model.dto'
// import { CreateModelCompleteDto } from '../dtos/create-model-complete.dto.ts'

// * (3) Importar Servicios
import { ArticleModelCompositeService } from '../services/article-model-composite.service'

@ApiTags('Article Model ')
@Controller('article-model')
export class ArticleModelController {
  constructor(
    private readonly articleModelCompositeService: ArticleModelCompositeService
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new article model and its transformation'
  })
  @ApiResponse({
    status: 201,
    description:
      'The article model and its transformation have been successfully created.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. The provided data is not valid.'
  })
  async createArticleModelWithTransformation(
    @Body()
    createArticleModelDto: CreateArticleModelDto
  ): Promise<any> {
    return this.articleModelCompositeService.createArticleModelWithTransformation(
      createArticleModelDto
    )
  }
}
