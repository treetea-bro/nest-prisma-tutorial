import { Injectable } from '@nestjs/common';
import { CreateUserSettingInput } from './dto/create-user-setting.input';
import { UpdateUserSettingInput } from './dto/update-user-setting.input';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserSettingsService {
  constructor(private prisma: PrismaService) {}
  create(createUserSettingInput: CreateUserSettingInput) {
    return 'This action adds a new userSetting';
  }

  findAll() {
    return `This action returns all userSettings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userSetting`;
  }

  update(loginId: string, data: UpdateUserSettingInput) {
    return this.prisma.userSetting.update({
      where: { loginId },
      data,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} userSetting`;
  }
}
