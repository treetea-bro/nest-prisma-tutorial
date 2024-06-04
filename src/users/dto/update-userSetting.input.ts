import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateUserSettingInput } from './create-userSetting.input';

@InputType()
export class UpdateUserSettingInput extends PartialType(
  OmitType(CreateUserSettingInput, ['userId']),
) {}
