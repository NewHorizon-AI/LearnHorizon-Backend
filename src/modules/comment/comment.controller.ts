import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put
} from '@nestjs/common'
import { CreateCommentDto } from 'src/dto/comment/create-comment.dto'
import { UpdateCommentDto } from 'src/dto/comment/update-comment.dto'
import { Comment } from 'src/schemas/comment.schema'
import { CommentService } from './comment.service'
import { ConflictException, NotFoundException } from '@nestjs/common'

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    try {
      return await this.commentService.create(createCommentDto)
    } catch (error) {
      throw new ConflictException('Comment already exists')
    }
  }

  @Get()
  async findAll(): Promise<Comment[]> {
    return this.commentService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Comment> {
    const comment = await this.commentService.findOne(id)
    if (!comment) {
      throw new NotFoundException('Comment not found')
    }
    return comment
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto
  ): Promise<Comment> {
    const comment = await this.commentService.update(id, updateCommentDto)
    if (!comment) {
      throw new NotFoundException('Comment not found')
    }
    return comment
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    const comment = await this.commentService.delete(id)
    if (!comment) {
      throw new NotFoundException('Comment not found')
    }
  }
}
