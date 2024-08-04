import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { UserModule } from './modules/users/user.module'
import { CategoryModule } from './modules/categories/category.module'
import { ArticleModule } from './modules/articles/article.module'
import { ArticleModelModule } from './modules/article-model/article-model.module'
import { UploadGltfModel } from './modules/upload-gltf/upload-gltf.module'

// OTROS
import { UploadModule } from './modules/multer/upload.module'

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
    ArticleModule,
    UploadGltfModel,
    ArticleModelModule,
    UploadModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
