import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignIn } from './dto/signin.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signIn')
  signIn(@Body() signIn: SignIn): Promise<{ accessToken: string }> {
    return this.authService.signIn(signIn);
  }
}
