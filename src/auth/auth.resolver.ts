import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginUserInput } from './dto/login-user.input';
import { Auth } from './entities/auth.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => Auth, { name: 'login' })
  findOne(@Args('loginInput') loginUserInput: LoginUserInput) {
    return this.authService.authenticate(loginUserInput);
  }
}
