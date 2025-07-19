import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from 'src/common/jwtauthguard/authguard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return await this.authService.register(dto);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() dto: VerifyOtpDto) {
    return await this.authService.verifyOtp(dto);
  }
  @Post('login')
  // @UseGuards(JwtAuthGuard)
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }
}
