import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let message = (exceptionResponse as any).message || exceptionResponse;

    if (Array.isArray(message)) {
      message = message.join(', ');
    }

    response.status(status).json({
      statusCode: status,
      message: message,
      // timestamp: new Date().toISOString(),
      // path: request.url,
    });
  }
}
