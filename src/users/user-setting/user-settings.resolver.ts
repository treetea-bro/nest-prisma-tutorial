import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserSettingsService } from './user-settings.service';
import { UserSetting } from './entities/user-setting.entity';
import { UpdateUserSettingInput } from './dto/update-user-setting.input';
import { LoginIdInput } from '../dto/login-id.input';

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
    @Args('loginIdInput')
    loginIdInput: LoginIdInput,
    @Args('updateUserSettingInput')
    updateUserSettingInput: UpdateUserSettingInput,
  ) {
    return this.userSettingsService.update(
      loginIdInput.loginId,
      updateUserSettingInput,
    );
  }

  // @Mutation(() => UserSetting)
  // removeUserSetting(@Args('id', { type: () => Int }) id: number) {
  //   return this.userSettingsService.remove(id);
  // }
}
