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
        throw new UnprocessableEntityException(
          'DB 테이블 제약조건을 위반하였습니다.',
        );
      }
      case 'P2025': {
        throw new NotFoundException(
          'DB 테이블 안에 원하시는 행이 존재하지 않습니다.',
        );
      }
    }
    return exception;
  }
}
