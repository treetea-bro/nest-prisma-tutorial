import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { PostsModule } from './posts/posts.module';
import {
  DirectiveLocation,
  GraphQLDirective,
  GraphQLError,
  GraphQLFormattedError,
  GraphQLInt,
} from 'graphql';
import { upperDirectiveTransformer } from './directive';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
      // formatError: (error: GraphQLError) => {
      //   let error_format: {
      //     message: string;
      //     error: string;
      //     statusCode: number;
      //   };
      //
      //   if (error.extensions.originalError) {
      //     const originalError = error.extensions.originalError as {
      //       message: string[];
      //       error: string;
      //       statusCode: number;
      //     };
      //     error_format = {
      //       message: originalError.message.join(' | '),
      //       error: originalError.error,
      //       statusCode: originalError.statusCode,
      //     };
      //   } else {
      //     error_format = {
      //       message: error.message,
      //       error: String(error.extensions.code),
      //       statusCode: 500,
      //     };
      //   }
      //   const graphQLFormattedError: GraphQLFormattedError = error_format;
      //   return graphQLFormattedError;
      // },
    }),
    UsersModule,
    PostsModule,
  ],
})
export class AppModule {}
