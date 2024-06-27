import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { LoginIdInput } from './dto/login-id.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // @Mutation(() => User, { description: '유저를 생성합니다.' })
  // createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
  //   return this.usersService.create(createUserInput);
  // }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('loginIdInput') loginIdInput: LoginIdInput) {
    return this.usersService.findOne(loginIdInput.loginId);
  }

  @Mutation(() => User)
  updateUser(
    @Args('loginIdInput') loginIdInput: LoginIdInput,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(loginIdInput.loginId, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('loginIdInput') loginIdInput: LoginIdInput) {
    return this.usersService.remove(loginIdInput.loginId);
  }
}
