import {
  Catch,
  ConflictException,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements GqlExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError): any {
    console.log(exception);
    switch (exception.code) {
      case 'P2002': {
        throw new ConflictException(exception.meta.target);
      }
      case 'P2003': {
        throw new UnprocessableEntityException(exception.meta.field_name);
      }
      case 'P2025': {
        throw new NotFoundException(exception.meta.cause);
      }
    }
    return exception;
  }
}
