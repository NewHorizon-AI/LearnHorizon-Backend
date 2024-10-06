import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common'

import { ArticleService } from '../services/article.service'
import { ApiTags } from '@nestjs/swagger'
import { CreateArticleDto } from '../dtos/create-article.dto'
import { UpdateArticleDto } from '../dtos/update-article.dto'

@ApiTags('articles')
@Controller('articles/v2')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto) {
    return await this.articleService.createArticle(createArticleDto)
  }

  @Get()
  async findAll() {
    return await this.articleService.getArticles()
  }

  @Get(':id')
  async getArticleById(@Param('id') id: string) {
    return await this.articleService.getArticleById(id)
  }

  @Patch(':id')
  async updateArticle(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto
  ) {
    return await this.articleService.updateArticle(id, updateArticleDto)
  }

  @Delete(':id')
  async deleteArticle(@Param('id') id: string) {
    return await this.articleService.deleteArticle(id)
  }
}
