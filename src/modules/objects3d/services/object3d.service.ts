import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Object3D } from '../schemas/object3d.schema'
import { validateBytes } from 'gltf-validator'
import { Express } from 'express' // Importar tipos de express

@Injectable()
export class Object3DService {
  constructor(
    @InjectModel(Object3D.name) private object3DModel: Model<Object3D>
  ) {}

  // Método para crear un nuevo modelo 3D
  async create(
    file: Express.Multer.File, // Usar el tipo correcto para el archivo
    createObject3DDto: any
  ): Promise<Object3D> {
    const { name, coordinates, rotationAngles, scale } = createObject3DDto

    // Validar el formato del archivo GLTF
    try {
      // Convierte el buffer del archivo a un Uint8Array y valida el contenido GLTF
      const validationResult = await validateBytes(new Uint8Array(file.buffer))

      // Verificar si hay errores en la validación
      if (validationResult.issues.numErrors > 0) {
        throw new BadRequestException('El archivo no es un formato GLTF válido')
      }
    } catch (error) {
      // Manejar cualquier error ocurrido durante la validación
      throw new BadRequestException(
        'Error al validar el archivo GLTF: ' + error.message
      )
    }

    // Validar el tamaño del archivo (debe ser menor a 10 MB)
    if (file.size > 10 * 1024 * 1024) {
      throw new BadRequestException('El archivo debe pesar menos de 10 MB')
    }

    // Crear un nuevo documento Object3D con los datos proporcionados
    const createdObject3D = new this.object3DModel({
      name, // Nombre del modelo 3D
      content: file.buffer.toString('base64'), // Contenido del archivo en formato base64
      size: file.size, // Tamaño del archivo en bytes
      coordinates, // Coordenadas [x, y, z]
      rotationAngles, // Ángulos de rotación [x, y, z]
      scale // Escala [x, y, z]
    })

    // Guardar el documento en la base de datos y retornar el resultado
    return createdObject3D.save()
  }
}
