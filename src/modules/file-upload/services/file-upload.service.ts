import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { File, FileDocument } from '../schemas/file.schema'

@Injectable()
export class FileUploadService {
  constructor(@InjectModel(File.name) private fileModel: Model<FileDocument>) {}

  async saveFileMetadata(file: Express.Multer.File): Promise<File> {
    const createdFile = new this.fileModel({
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size
    })
    return createdFile.save()
  }
}
