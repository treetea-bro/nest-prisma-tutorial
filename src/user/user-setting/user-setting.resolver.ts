import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserSettingsService } from './user-setting.service';
import { UserSetting } from './entities/user-setting.entity';
import { UpdateUserSettingInput } from './dto/update-user-setting.input';

@Resolver(() => UserSetting)
export class UserSettingsResolver {
  constructor(private readonly userSettingsService: UserSettingsService) {}

  // @Mutation(() => UserSetting)
  // createUserSetting(@Args('createUserSettingInput') createUserSettingInput: CreateUserSettingInput) {
  //   return this.userSettingsService.create(createUserSettingInput);
  // }
  //
  // @Query(() => [UserSetting], { name: 'userSettings' })
  // findAll() {
  //   return this.userSettingsService.findAll();
  // }
  //
  // @Query(() => UserSetting, { name: 'userSetting' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.userSettingsService.findOne(id);
  // }

  @Mutation(() => UserSetting)
  updateUserSetting(
    @Args('loginId')
    loginId: string,
    @Args('updateUserSettingInput')
    updateUserSettingInput: UpdateUserSettingInput,
  ) {
    return this.userSettingsService.update(loginId, updateUserSettingInput);
  }

  // @Mutation(() => UserSetting)
  // removeUserSetting(@Args('id', { type: () => Int }) id: number) {
  //   return this.userSettingsService.remove(id);
  // }
}
