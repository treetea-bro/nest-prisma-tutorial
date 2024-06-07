import { ObjectType, Field, Directive } from '@nestjs/graphql';
import { UserSetting } from '../user-setting/entities/user-setting.entity';
import { Length } from 'class-validator';

@ObjectType()
export class User {
  @Field()
  loginId: string;

  @Directive('@upper')
  @Field()
  username: string;

  @Length(5, 10)
  @Field({ nullable: true })
  displayName?: string;

  @Field(() => UserSetting, { nullable: true })
  userSetting?: UserSetting;
}
