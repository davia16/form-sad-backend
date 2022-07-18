import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { decriptPassword } from '../utils/bcrypt.utils';
import { JwtPayload } from './dto/jwt-payload.interface.dto';
import { SignIn } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(signIn: SignIn): Promise<{ accessToken: string }> {
    const user = await this.usersService.getUserByEmail(signIn.email);
    if (user && (await decriptPassword(signIn.password, user.password))) {
      const payload: JwtPayload = {
        profile: user.profile,
        email: user.email,
      };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Usuário e/ou senha inválidos.');
    }
  }

  async signOut(signIn: SignIn) {
    return true;
  }
}
