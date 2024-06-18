import { NestFactory } from '@nestjs/core';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { urlencoded, json } from 'express';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './common/exception-filter/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
  );

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else if (process.env.NODE_ENV === 'production') {
    app.enableCors();
    // app.enableCors({
    //   origin: (origin, callback) => {
    //     const allowedOrigins = [
    //       'http://example.com',
    //       'http://another-domain.com',
    //     ];
    //     if (allowedOrigins.includes(origin)) {
    //       callback(null, true);
    //     } else {
    //       callback(new Error('Not allowed by CORS'));
    //     }
    //   },
    //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    //   allowedHeaders: 'Content-Type, Accept',
    //   credentials: true,
    // });
  }

  const PORT = process.env.PORT || 3000;

  app.useGlobalFilters(new PrismaClientExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        return new BadRequestException(Object.values(errors[0].constraints)[0]);
      },
    }),
  );
  app.use(json({ limit: '100mb' }));
  app.use(urlencoded({ limit: '100mb', extended: true }));
  app.use(
    '/graphql',
    graphqlUploadExpress({ maxFileSize: 100_000_000, maxFiles: 10 }),
  );
  await app.listen(PORT, () => {
    console.log(`Running in MODE: ${process.env.NODE_ENV} on Port: ${PORT}`);
  });
}
bootstrap();
