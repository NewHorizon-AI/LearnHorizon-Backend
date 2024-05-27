import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { UserModule } from './modules/users/user.module'
import { CategoryModule } from './modules/categories/category.module'
import { PublicationModule } from './modules/publications/publication.module'
import { CommentModule } from './modules/comments/comment.module'

import { SeederService } from './seeder'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/learn-horizon-backend'),
    UserModule,
    CategoryModule,
    PublicationModule,
    CommentModule
  ],
  controllers: [],
  providers: [SeederService]
})
export class AppModule {}
