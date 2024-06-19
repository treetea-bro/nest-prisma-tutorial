import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroupPostInput } from './dto/create-group-post.input';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePostInput) {
    const userId = await this.prisma.findUserIdByLoginId(data.loginId);
    delete data.loginId;
    return await this.prisma.post.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  createGroupPost(loginIds: string[], data: CreateGroupPostInput) {
    return this.prisma.groupPost.create({
      data: {
        ...data,
        UserGroupPosts: {
          create: loginIds.map((loginId) => ({ loginId })),
        },
      },
    });
  }

  async findAll() {
    return this.prisma.post.findMany();
  }

  async update(id: number, data: UpdatePostInput) {
    return this.prisma.post.update({ data, where: { id } });
  }

  remove(id: number) {
    return this.prisma.post.delete({ where: { id } });
  }
}
