import { Module } from '@nestjs/common'

import { AppService } from './app.service'
import { UserModule } from './modules/user/user.module'
import { CategoryModule } from './modules/category/category.module'
import { PostModule } from './modules/post/post.module'
import { CommentsModule } from './modules/comments/comments.module'

@Module({
  imports: [UserModule, CategoryModule, PostModule, CommentsModule],
  controllers: [],
  providers: [AppService]
})
export class AppModule {}
