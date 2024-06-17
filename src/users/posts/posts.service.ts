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
    return await this.prisma.post.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  createGroupPost(data: CreateGroupPostInput) {
    return this.prisma.groupPost.create({ data });
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
