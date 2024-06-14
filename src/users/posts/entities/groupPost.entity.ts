import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GroupPost {
  @Field()
  title: string;

  @Field()
  description: string;
}
