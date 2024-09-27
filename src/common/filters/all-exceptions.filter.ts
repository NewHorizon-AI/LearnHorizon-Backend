import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { Response, Request } from 'express'

// * Filtro global que captura todas las excepciones lanzadas en la aplicación
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    // * 1. Recuperar el contexto HTTP
    const { response, request } = this.getHttpContext(host)

    // * 2. Determinar el estado HTTP a partir de la excepción
    const status = this.getHttpStatus(exception)

    // * 3. Generar el mensaje de respuesta adecuado
    const message = this.getErrorMessage(exception)

    // * 4. Enviar la respuesta al cliente con el formato adecuado
    this.sendErrorResponse(response, status, request.url, message)
  }

  // * Método privado para obtener el contexto HTTP desde el host de argumentos
  private getHttpContext(host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    return {
      response: ctx.getResponse<Response>(),
      request: ctx.getRequest<Request>()
    }
  }

  // * Método privado para determinar el estado HTTP basado en la excepción
  private getHttpStatus(exception: unknown): number {
    return exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR
  }

  // * Método privado para generar el mensaje de error adecuado
  private getErrorMessage(exception: unknown): string | object {
    return exception instanceof HttpException
      ? exception.getResponse()
      : 'Internal Server Error'
  }

  // * Método privado para enviar la respuesta de error al cliente
  private sendErrorResponse(
    response: Response,
    status: number,
    path: string,
    message: string | object
  ): void {
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path,
      message
    })
  }
}
