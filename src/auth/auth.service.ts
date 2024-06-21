import { Injectable, UnauthorizedException } from '@nestjs/common';
import { verify } from 'argon2';
import { UsersService } from 'src/users/users.service';

type AuthInput = { loginId: string; password: string };
type SignInData = { username: string };
type AuthResult = { accessToken: string; username: string };

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async authenticate(data: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(data);

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      accessToken: 'fake-access',
      username: user.username,
    };
  }

  async validateUser(data: AuthInput): Promise<SignInData | null> {
    const user = await this.userService.findOne(data.loginId);

    if (await verify(user.password, data.password)) {
      return {
        username: user.username,
      };
    }
    return null;
  }
}
