import { ObjectType, Field, Directive } from '@nestjs/graphql';

@ObjectType()
export class UserSetting {
  @Field()
  notificationsOn: boolean;

  @Field()
  smsEnabled: boolean;
}
