import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RegisterDto } from './dto/register.dto';
import { User } from 'src/users/user.model';
import { generateOtp } from 'src/common/constants/utils/generate-otp';
import {
  USER_ALREADY_EXISTS,
  SOMETHING_WENT_WRONG,
  USER_NOT_FOUND,
  INVALID_OTP,
  OTP_EXPIRED,
  Email_Not_Verify,
} from 'src/common/constants/error-messages';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    try {
      const existingUser = await this.userModel.findOne({
        where: { email: dto.email },
      });

      if (existingUser) {
        throw new ConflictException(USER_ALREADY_EXISTS);
      }

      const otp = generateOtp(4);
      const otpExpiry = new Date(Date.now() + 60 * 1000);
      console.log('OTP expiry:', otpExpiry);

      const user = await this.userModel.create({
        ...dto,
        otp,
        otp_expires_at: otpExpiry,
        is_verified: false,
      } as any);

      return {
        message: 'User registered. OTP sent to email.',
        user,
      };
    } catch (error) {
      if (error instanceof ConflictException) throw error;

      console.error('Registration failed:', error);
      throw new InternalServerErrorException(SOMETHING_WENT_WRONG);
    }
  }
  async verifyOtp(dto: VerifyOtpDto) {
    try {
      const user = await this.userModel.findOne({
        where: { email: dto.email },
      });
      if (!user) {
        throw new NotFoundException(USER_NOT_FOUND);
      }
      console.log(user.otp, 'user exist');
      if (user.otp !== dto.otp) {
        throw new BadRequestException(INVALID_OTP);
      }
      // console.log('Current time:', new Date());
      // console.log('OTP expiry time:', new Date(user.otp_expires_at));
      // if (user.otp_expires_at && new Date(user.otp_expires_at) < new Date()) {
      //   throw new BadRequestException(OTP_EXPIRED);
      // }
      user.is_verified = true;
      user.otp = '';
      // user.otp_expires_at = null;
      await user.save();
      const payload = { userId: user.id, email: user.email };
      const token = this.jwtService.sign(payload);

      return {
        message: 'OTP verified successfully.',
        token,
        user: {
          id: user.id,
          email: user.email,
          is_verified: user.is_verified,
        },
      };
    } catch (error) {
      console.error('OTP verification failed:', error);
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        console.log(error);
        throw error;
      }

      throw new InternalServerErrorException(SOMETHING_WENT_WRONG);
    }
  }
  async login(dto: LoginDto) {
    try {
      const user = await this.userModel.findOne({
        where: { email: dto.email },
      });
      if (!user) {
        throw new NotFoundException(USER_NOT_FOUND);
      }
      const otp = generateOtp(4);
      const otpExpiry = new Date(Date.now() + 60 * 1000);
      user.otp = otp;
      user.otp_expires_at = otpExpiry;
      await user.save();

      return {
        message: 'OTP sent to your email.',
        otp,
      };
    } catch (error) {
      console.log('Login errror', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(SOMETHING_WENT_WRONG);
    }
  }
}
