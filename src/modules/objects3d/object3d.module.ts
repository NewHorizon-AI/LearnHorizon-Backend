import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

// import { Object3DService } from './services/object3d.service'
import { Object3D, Object3DSchema } from './schemas/object3d.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Object3D.name, schema: Object3DSchema }])
  ],
  providers: [], // Object3DService
  exports: [MongooseModule]
})
export class Object3dModule {}
