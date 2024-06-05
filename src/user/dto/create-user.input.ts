import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  loginId: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  displayName?: string;
}
