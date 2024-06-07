import { Module } from '@nestjs/common';
import { UserSettingsService } from './user-settings.service';
import { UserSettingsResolver } from './user-settings.resolver';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserSettingsResolver, UserSettingsService],
})
export class UserSettingsModule {}
