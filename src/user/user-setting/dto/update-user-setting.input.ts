import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateUserSettingInput } from './create-user-setting.input';

@InputType()
export class UpdateUserSettingInput extends PartialType(
  OmitType(CreateUserSettingInput, ['userLoginId']),
) {}
