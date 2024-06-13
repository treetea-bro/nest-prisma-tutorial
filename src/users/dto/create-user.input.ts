import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, Length } from 'class-validator';
import {
  lengthValidationDescription,
  lengthValidationMessage,
} from '../../common/validation-message/length-validation.message';

@InputType()
export class CreateUserInput {
  @Length(1, 30, { message: lengthValidationMessage })
  @Field({ description: lengthValidationDescription(1, 30) })
  loginId: string;

  @Length(1, 30, { message: lengthValidationMessage })
  @Field({ description: lengthValidationDescription(1, 30) })
  username: string;

  @IsOptional()
  @Length(1, 30)
  @Field({ nullable: true, description: lengthValidationDescription(1, 30) })
  displayName?: string;
}
