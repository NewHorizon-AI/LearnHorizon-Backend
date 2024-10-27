import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
// import { APP_FILTER } from '@nestjs/core'
import { ConfigModule, ConfigService } from '@nestjs/config'

// * Importar filtro global de excepciones
// import { AllExceptionsFilter } from 'src/common/filters/http-exception.filter'

// * Importar los módulos de la aplicación
import { UserModule } from './modules/users/user.module'
// import { CategoryModule } from './modules/categories/category.module'
// import { ArticleModule } from './modules/articles/article.module'

import { DigitalAssetModule } from './modules/digital-asset/digital-asset.module'
import { AuthModule } from './modules/auth/auth.module'

import { SceneModule } from './modules/scene/scene.module'
// * Importar Segunda version de los módulos
import { CategoryModuleV2 } from './modules/categories/category.module'
import { ArticleModulev2 } from './modules/articles/article.module'
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
    // CategoryModule,
    // ArticleModule,
    DigitalAssetModule,
    AuthModule,
    SceneModule,
    ArticleModulev2,
    CategoryModuleV2
  ],
  controllers: []
  // providers: [
  //   {
  //     provide: APP_FILTER,
  //     useClass: AllExceptionsFilter
  //   }
  // ]
})
export class AppModule {}
