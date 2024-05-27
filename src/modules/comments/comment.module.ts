import { Module } from '@nestjs/common'
import { CommentController } from './controllers/comment.controller'
import { CommentService } from './services/comment.service'
import { MongooseModule } from '@nestjs/mongoose'
import {
  Comment,
  CommentSchema
} from 'src/modules/comments/schemas/comment.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }])
  ], // Importar el modelo de la base de datos
  controllers: [CommentController],
  providers: [CommentService],
  exports: [MongooseModule] // Exportar el módulo de Mongoose
})
export class CommentModule {}
