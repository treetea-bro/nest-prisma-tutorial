import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  loginId: string;
}
