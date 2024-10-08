// import {
//   ExceptionFilter,
//   Catch,
//   ArgumentsHost,
//   HttpException,
//   HttpStatus
// } from '@nestjs/common'
// import { Response, Request } from 'express'

// // TODO 1: Crear el filtro global de excepciones
// // - Crear el archivo 'http-exception.filter.ts' dentro de la carpeta 'src/common/filters/'.
// // - Definir el filtro de excepciones global usando @Catch().
// // - Modularizar la lógica del filtro usando métodos privados:
// //   * getHttpContext: Extraer el contexto HTTP (request, response).
// //   * getHttpStatus: Determinar si el error es 4xx (cliente) o 5xx (servidor).
// //   * getErrorMessage: Generar mensajes de error personalizados.
// //   * sendErrorResponse: Enviar la respuesta con código de estado, timestamp, mensaje, etc.

// // TODO 2: Añadir logging de errores con 'Logger'
// // - Agregar una instancia de 'Logger' en el filtro para registrar cada excepción.
// // - Registrar el mensaje de error y el stack trace en los logs.

// // TODO 3: Diferenciar errores de cliente (4xx) y servidor (5xx)
// // - Modificar 'getHttpStatus' para distinguir entre errores de cliente (4xx) y errores de servidor (5xx).
// // - Utilizar códigos de estado HTTP adecuados para cada tipo de error.

// // TODO 4: Personalizar el formato del mensaje de error
// // - En 'sendErrorResponse', agregar campos adicionales como 'errorCode' para dar más contexto sobre el error.
// // - Incluir timestamp, path, y detalles del error en el mensaje JSON devuelto al cliente.

// // TODO 5: Manejar excepciones específicas
// // - Implementar manejo de errores personalizados, como validaciones o autenticación, usando clases de excepción personalizadas.
// // - Definir un método en 'getErrorMessage' para manejar tipos de excepciones como ValidationException o AuthenticationException.

// // TODO 6: Registrar el filtro de excepciones global en 'main.ts'
// // - Modificar el archivo 'src/main.ts' para registrar el filtro de excepciones global con 'app.useGlobalFilters()'.
// // - Asegurar que el filtro se aplique a toda la aplicación.

// // TODO 7: Probar el manejo de excepciones
// // - Realizar pruebas unitarias en 'http-exception.filter.ts' para asegurar que el manejo de errores funciona correctamente.
// // - Simular diferentes tipos de errores (errores HTTP, validación, etc.) para validar el filtro.
// // - Asegurarse de que el formato de respuesta y el logging funcionen según lo esperado.

// // TODO 8: Implementar logging avanzado (opcional)
// // - Integrar un sistema de logging avanzado como Winston o Sentry para capturar y almacenar los errores en producción.
// // - Configurar los niveles de logging (error, warning, info) en el filtro.

// // * Filtro global que captura todas las excepciones lanzadas en la aplicación
// @Catch()
// export class AllExceptionsFilter implements ExceptionFilter {
//   catch(exception: unknown, host: ArgumentsHost): void {
//     // * 1. Recuperar el contexto HTTP
//     const { response, request } = this.getHttpContext(host)

//     // * 2. Determinar el estado HTTP a partir de la excepción
//     const status = this.getHttpStatus(exception)

//     // * 3. Generar el mensaje de respuesta adecuado
//     const message = this.getErrorMessage(exception)

//     // * 4. Enviar la respuesta al cliente con el formato adecuado
//     this.sendErrorResponse(response, status, request.url, message)
//   }

//   // * Método privado para obtener el contexto HTTP desde el host de argumentos
//   private getHttpContext(host: ArgumentsHost) {
//     const ctx = host.switchToHttp()
//     return {
//       response: ctx.getResponse<Response>(),
//       request: ctx.getRequest<Request>()
//     }
//   }

//   // * Método privado para determinar el estado HTTP basado en la excepción
//   private getHttpStatus(exception: unknown): number {
//     return exception instanceof HttpException
//       ? exception.getStatus()
//       : HttpStatus.INTERNAL_SERVER_ERROR
//   }

//   // * Método privado para generar el mensaje de error adecuado
//   private getErrorMessage(exception: unknown): string | object {
//     return exception instanceof HttpException
//       ? exception.getResponse()
//       : 'Internal Server Error'
//   }

//   // * Método privado para enviar la respuesta de error al cliente
//   private sendErrorResponse(
//     response: Response,
//     status: number,
//     path: string,
//     message: string | object
//   ): void {
//     response.status(status).json({
//       statusCode: status,
//       timestamp: new Date().toISOString(),
//       path,
//       message
//     })
//   }
// }
