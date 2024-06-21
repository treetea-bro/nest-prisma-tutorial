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
      throw new NotFoundException(
        `로그인 아이디 ${loginId}이(가) 존재하지 않습니다.`,
      );
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
      select: { id: true, loginId: true },
    });

    const foundLoginIds = new Set(users.map((user) => user.loginId));
    const missingLoginIds = loginIds.filter(
      (loginId) => !foundLoginIds.has(loginId),
    );

    if (missingLoginIds.length > 0) {
      throw new NotFoundException(
        `로그인 아이디 [${missingLoginIds.join(', ')}] 들이 존재하지 않습니다.`,
      );
    }

    return users.map((user) => user.id);
  }
}
