import { InputType, Field } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import {
  maxLengthValidationDescription,
  maxLengthValidationMessage,
} from 'src/common/validation-message/length-validation.message';

@InputType()
export class CreatePostInput {
  @MaxLength(200, { message: maxLengthValidationMessage })
  @Field({ description: maxLengthValidationDescription(200) })
  title: string;

  @Field()
  description: string;

  @Field()
  loginId: string;
}
