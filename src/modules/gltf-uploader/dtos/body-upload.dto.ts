import { ApiProperty } from '@nestjs/swagger'

export class UploadDto {
  @ApiProperty({ description: 'ID asociado al archivo' })
  id: string
}
