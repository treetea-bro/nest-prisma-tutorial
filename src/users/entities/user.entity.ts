import { ObjectType, Field } from '@nestjs/graphql';
import { UserSetting } from '../user-setting/entities/user-setting.entity';
import { Post } from '../posts/entities/post.entity';

@ObjectType()
export class User {
  @Field({ description: '로그인 아이디' })
  loginId: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  displayName?: string;

  @Field(() => UserSetting, { nullable: true })
  userSetting?: UserSetting;

  @Field(() => [Post], { nullable: true })
  posts?: Post[];
}
