import { PartialType } from '@nestjs/swagger'
import { CreateGltfModelAssetDto } from './create-gltf-model-asset.dto'

export class UpdateGltfModelAssetDto extends PartialType(
  CreateGltfModelAssetDto
) {}
