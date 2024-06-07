import { NestFactory } from '@nestjs/core';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { urlencoded, json } from 'express';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const messages = errors.map((error) => {
          return `parameter: ${error.property}, value: ${error.value}, reason: ${Object.values(error.constraints).join(', ')}`;
        });
        return new BadRequestException(messages);
      },
    }),
  );
  app.use(json({ limit: '100mb' }));
  app.use(urlencoded({ limit: '100mb', extended: true }));
  app.use(
    '/graphql',
    graphqlUploadExpress({ maxFileSize: 100_000_000, maxFiles: 10 }),
  );
  await app.listen(3000);
}
bootstrap();
