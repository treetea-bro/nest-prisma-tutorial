import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersResolver } from './user.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { UserSettingsModule } from './user-setting/user-setting.module';

@Module({
  imports: [PrismaModule, UserSettingsModule],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
