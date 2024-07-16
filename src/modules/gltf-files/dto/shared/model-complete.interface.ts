import { ArticleModelEntry } from '../../schemas/article-model-entry.schema'
import { GltfFile } from '../../schemas/gltf-file.schema'
import { ModelTransformation } from '../../schemas/model-transformation.schema'

export interface ModelComplete {
  articleModelEntry?: ArticleModelEntry
  gltfFile?: GltfFile
  modelTransformation?: ModelTransformation
}
