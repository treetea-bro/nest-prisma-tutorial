import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: {
        ...data,
        userSetting: {
          create: {
            smsEnabled: true,
            notificationsOn: false,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany({ include: { userSetting: true } });
  }

  findOne(loginId: string) {
    return this.prisma.user.findUniqueOrThrow({
      include: { userSetting: true },
      where: { loginId },
    });
  }

  async update(loginId: string, data: Prisma.UserUpdateInput) {
    // if (data.loginId) {
    //   const findUser = await this.prisma.user.findUnique({
    //     where: { loginId: data.loginId as string },
    //   });
    //   if (findUser) throw new HttpException('Username already taken', 400);
    // }
    return this.prisma.user.update({
      where: { loginId },
      data,
    });
  }

  async remove(loginId: string) {
    return this.prisma.user.delete({
      include: { userSetting: true },
      where: { loginId },
    });
  }
}
