import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { UserModule } from './modules/user/user.module'
import { CategoryModule } from './modules/category/category.module'
import { PostModule } from './modules/post/post.module'
import { CommentModule } from './modules/comment/comment.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/learn-horizon-backend'),
    UserModule,
    CategoryModule,
    PostModule,
    CommentModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
