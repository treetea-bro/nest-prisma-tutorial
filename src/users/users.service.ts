import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserInput) {
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
      include: { userSetting: true },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      include: { userSetting: true, posts: true },
    });
  }

  findOne(loginId: string) {
    return this.prisma.user.findUniqueOrThrow({
      where: { loginId },
      include: { userSetting: true, posts: true },
    });
  }

  async update(loginId: string, data: UpdateUserInput) {
    // if (data.loginId) {
    //   const findUser = await this.prisma.user.findUnique({
    //     where: { loginId: data.loginId as string },
    //   });
    //   if (findUser) throw new HttpException('Username already taken', 400);
    // }
    return this.prisma.user.update({
      data,
      where: { loginId },
      include: { userSetting: true },
    });
  }

  async remove(loginId: string) {
    return this.prisma.user.delete({
      where: { loginId },
      include: { userSetting: true },
    });
  }
}
