import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { UserModule } from './modules/users/user.module'
import { CategoryModule } from './modules/categories/category.module'
import { PublicationModule } from './modules/publications/publication.module'
import { CommentModule } from './modules/comments/comment.module'

import { SeederService } from './seeder'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri:
          process.env.NODE_ENV === 'production'
            ? configService.get<string>('MONGO_URI_REMOTE')
            : configService.get<string>('MONGO_URI_LOCAL')
      }),
      inject: [ConfigService]
    }),
    UserModule,
    CategoryModule,
    PublicationModule,
    CommentModule
  ],
  controllers: [],
  providers: [SeederService]
})
export class AppModule {}
