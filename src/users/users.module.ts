import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { UserSettingsModule } from './user-setting/user-settings.module';

@Module({
  imports: [PrismaModule, UserSettingsModule],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
