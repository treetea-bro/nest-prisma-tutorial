// import { Injectable, OnModuleInit } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';
//
// @Injectable()
// export class PrismaService extends PrismaClient implements OnModuleInit {
//   onModuleInit() {
//     this.$connect()
//       .then(() => console.log('Connected to DB'))
//       .catch((err) => console.log(err));
//   }
// }

import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Connected to DB');
    } catch (err) {
      console.log(err);
    }
  }

  async findUserIdByLoginId(loginId: string): Promise<bigint> {
    const user = await this.user.findUnique({
      where: { loginId },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.id;
  }
  async findUserIdsByLoginIds(loginIds: string[]): Promise<bigint[]> {
    const users = await this.user.findMany({
      where: {
        loginId: {
          in: loginIds,
        },
      },
      select: { id: true },
    });

    if (users.length === 0) {
      throw new NotFoundException('Users not found');
    }

    return users.map((user) => user.id);
  }
}
