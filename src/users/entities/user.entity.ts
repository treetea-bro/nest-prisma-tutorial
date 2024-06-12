import { ObjectType, Field } from '@nestjs/graphql';
import { UserSetting } from '../user-setting/entities/user-setting.entity';

@ObjectType()
export class User {
  @Field()
  loginId: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  displayName?: string;

  @Field(() => UserSetting, { nullable: true })
  userSetting?: UserSetting;
}
