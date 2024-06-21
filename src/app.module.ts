import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { BigIntResolver } from 'graphql-scalars';
import { AuthService } from './auth/auth.service';
import { AuthResolver } from './auth/auth.resolver';
import { AuthModule } from './auth/auth.module';

interface OriginalError {
  message: string;
  error: string;
  // statusCode: number;
}

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      resolvers: { BigInt: BigIntResolver },
      formatError: (error: GraphQLError) => {
        const originalError = error.extensions?.originalError as OriginalError;

        if (!originalError) {
          return {
            message: error.message,
            code: error.extensions?.code,
            // statusCode: 500,
          };
        }
        return {
          message: originalError.message,
          code: originalError.error,
          // statusCode: originalError.statusCode,
        };
      },
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
