import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { UserModule } from './modules/user/user.module'
import { CategoryModule } from './modules/category/category.module'
import { PublicationModule } from './modules/publication/publication.module'
import { CommentModule } from './modules/comment/comment.module'

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
