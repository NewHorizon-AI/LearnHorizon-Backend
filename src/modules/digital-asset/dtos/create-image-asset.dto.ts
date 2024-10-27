// import { CreateDigitalAssetDto } from './create-digital-asset.dto'
// import { ApiProperty } from '@nestjs/swagger'
// import { IsString, IsNumber, IsEnum, IsBoolean } from 'class-validator'

// export class CreateImageAssetDto extends CreateDigitalAssetDto {
//   @ApiProperty({
//     description: 'Tipo MIME del archivo',
//     example: 'image/jpeg'
//   })
//   @IsString()
//   readonly mimetype: string

//   @ApiProperty({
//     description: 'Tamaño del archivo en bytes (máximo 5 MB para imágenes)',
//     example: 5242880
//   })
//   @IsNumber()
//   readonly size: number

//   @ApiProperty({
//     description: 'Estado del archivo',
//     example: 'procesando'
//   })
//   @IsEnum(['procesando', 'optimizado', 'rechazado'])
//   readonly status: string

//   @ApiProperty({
//     description: '¿La imagen ha sido optimizada?',
//     example: true
//   })
//   @IsBoolean()
//   readonly isOptimized: boolean

//   @ApiProperty({
//     description: 'Orientación de la imagen',
//     example: 'horizontal'
//   })
//   @IsString()
//   readonly orientation: string

//   @ApiProperty({
//     description: '¿La imagen tiene un fondo transparente?',
//     example: true
//   })
//   @IsBoolean()
//   readonly hasTransparentBackground: boolean
// }
