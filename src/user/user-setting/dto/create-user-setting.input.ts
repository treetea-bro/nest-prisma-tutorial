import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserSettingInput {
  @Field()
  smsEnabled: boolean;

  @Field()
  notificationsOn: boolean;

  @Field()
  userLoginId: string;
}
