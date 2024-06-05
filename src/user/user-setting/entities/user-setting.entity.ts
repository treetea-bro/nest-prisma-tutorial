import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserSetting {
  @Field()
  notificationsOn: boolean;

  @Field()
  smsEnabled: boolean;
}
