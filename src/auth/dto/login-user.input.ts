import { InputType, Field } from '@nestjs/graphql';
import { Length } from 'class-validator';
import {
  lengthValidationDescription,
  lengthValidationMessage,
} from '../../common/validation-message/length-validation.message';

@InputType()
export class LoginUserInput {
  @Length(1, 30, { message: lengthValidationMessage })
  @Field({ description: lengthValidationDescription(1, 30) })
  loginId: string;

  @Length(1, 30, { message: lengthValidationMessage })
  @Field({ description: lengthValidationDescription(1, 30) })
  password: string;
}
