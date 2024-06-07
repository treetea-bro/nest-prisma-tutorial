import { InputType, Field, Directive } from '@nestjs/graphql';
import { MaxLength, IsOptional, IsEmail, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  // @MaxLength(3, {
  //   message: 'Maximum length is 30 characters.',
  // })
  // @Length(5, 10)
  @Field()
  loginId: string;

  // @MaxLength(3, {
  //   message: 'Maximum length is 30 characters.',
  // })
  @Field()
  username: string;

  @IsOptional()
  @MaxLength(15, {
    message: 'Maximum length is 15 characters.',
  })
  @Field({ nullable: true })
  displayName?: string;
}
