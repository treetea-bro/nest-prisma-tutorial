import { InputType, Field } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @MaxLength(3, {
    message: 'Name is too long. Maximum length is 30 characters.',
  })
  loginId: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  displayName?: string;
}
