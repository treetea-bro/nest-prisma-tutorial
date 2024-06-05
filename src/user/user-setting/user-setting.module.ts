import { Module } from '@nestjs/common';
import { UserSettingsService } from './user-setting.service';
import { UserSettingsResolver } from './user-setting.resolver';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserSettingsResolver, UserSettingsService],
})
export class UserSettingsModule {}
