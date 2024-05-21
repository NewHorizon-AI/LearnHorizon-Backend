import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateCommentDto } from 'src/modules/comment/dto/create-comment.dto'
import { UpdateCommentDto } from 'src/modules/comment/dto/update-comment.dto'
import { Comment } from 'src/schemas/comment.schema'

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const createdComment = new this.commentModel(createCommentDto)
    return createdComment.save()
  }

  async findAll(): Promise<Comment[]> {
    return this.commentModel.find().exec()
  }

  async findOne(id: string): Promise<Comment> {
    return this.commentModel.findById(id).exec()
  }

  async update(
    id: string,
    updateCommentDto: UpdateCommentDto
  ): Promise<Comment> {
    return this.commentModel
      .findByIdAndUpdate(id, updateCommentDto, { new: true })
      .exec()
  }

  async delete(id: string): Promise<Comment> {
    return this.commentModel.findByIdAndDelete(id).exec()
  }
}
