import { ObjectType, Field } from '@nestjs/graphql';
import { UserSetting } from './userSetting.entity';

@ObjectType()
export class User {
  // @Field()
  // loginId: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  displayName?: string;

  @Field(() => UserSetting, { nullable: true })
  userSetting?: UserSetting;
}
