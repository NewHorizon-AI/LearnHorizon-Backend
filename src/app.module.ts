import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { APP_FILTER } from '@nestjs/core'
import { ConfigModule, ConfigService } from '@nestjs/config'

// * Importar filtro global de excepciones
import { AllExceptionsFilter } from 'src/common/filters/all-exceptions.filter'

// * Importar los módulos de la aplicación
import { UserModule } from './modules/users/user.module'
import { CategoryModule } from './modules/categories/category.module'
import { ArticleModule } from './modules/articles/article.module'
import { ArticleModelModule } from './modules/article-model/article-model.module'
import { UploadModule } from './modules/upload/upload.module'
import { AuthModule } from './modules/auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>(
          process.env.NODE_ENV === 'production'
            ? 'MONGO_URI_REMOTE'
            : 'MONGO_URI_LOCAL'
        )
      }),
      inject: [ConfigService]
    }),
    UserModule,
    CategoryModule,
    ArticleModule,
    ArticleModelModule,
    UploadModule,
    AuthModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    }
  ]
})
export class AppModule {}
