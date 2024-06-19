import { Field, ObjectType } from '@nestjs/graphql';
import { BigIntResolver } from 'graphql-scalars';

@ObjectType()
export class Post {
  @Field(() => BigIntResolver)
  id: bigint;

  @Field()
  title: string;

  @Field()
  description: string;
}
