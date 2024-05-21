import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  ConflictException,
  NotFoundException
} from '@nestjs/common'
import { CreateCommentDto } from 'src/modules/comment/dto/create-comment.dto'
import { UpdateCommentDto } from 'src/modules/comment/dto/update-comment.dto'
import { Comment } from 'src/schemas/comment.schema'
import { CommentService } from './comment.service'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo comentario' })
  @ApiResponse({
    status: 201,
    description: 'El comentario ha sido creado exitosamente.',
    type: Comment
  })
  @ApiResponse({
    status: 409,
    description: 'El comentario ya existe.'
  })
  async create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    try {
      return await this.commentService.create(createCommentDto)
    } catch (error) {
      throw new ConflictException('Comment already exists')
    }
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los comentarios' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los comentarios.',
    type: [Comment]
  })
  async findAll(): Promise<Comment[]> {
    return this.commentService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un comentario por ID' })
  @ApiResponse({
    status: 200,
    description: 'El comentario ha sido encontrado.',
    type: Comment
  })
  @ApiResponse({
    status: 404,
    description: 'Comentario no encontrado.'
  })
  async findOne(@Param('id') id: string): Promise<Comment> {
    const comment = await this.commentService.findOne(id)
    if (!comment) {
      throw new NotFoundException('Comment not found')
    }
    return comment
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un comentario' })
  @ApiResponse({
    status: 200,
    description: 'El comentario ha sido actualizado exitosamente.',
    type: Comment
  })
  @ApiResponse({
    status: 404,
    description: 'Comentario no encontrado.'
  })
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
  @ApiOperation({ summary: 'Eliminar un comentario' })
  @ApiResponse({
    status: 204,
    description: 'El comentario ha sido eliminado exitosamente.'
  })
  @ApiResponse({
    status: 404,
    description: 'Comentario no encontrado.'
  })
  async delete(@Param('id') id: string): Promise<void> {
    const comment = await this.commentService.delete(id)
    if (!comment) {
      throw new NotFoundException('Comment not found')
    }
  }
}
