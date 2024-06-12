import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, Length } from 'class-validator';
import { lengthValidationMessage } from '../../common/validation-message/length-validation.message';

@InputType()
export class CreateUserInput {
  @Length(1, 30, { message: lengthValidationMessage })
  @Field({ description: 'loginId' })
  loginId: string;

  @Length(1, 30, { message: lengthValidationMessage })
  @Field()
  username: string;

  @IsOptional()
  @Length(1, 30)
  @Field({ nullable: true })
  displayName?: string;
}
