import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { USER_ALREADY_EXISTS } from 'src/common/constants/error-messages';
import { generateOtp } from 'src/common/constants/utils/generate-otp';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  // async create(
  //   createUserDto: CreateUserDto,
  // ): Promise<{ user: User; message: string }> {
  //   try {
  //     const existingUser = await this.findByEmail(createUserDto.email);
  //     if (existingUser) {
  //       throw new ConflictException(USER_ALREADY_EXISTS);
  //     }
  //   } catch (error) {
  //     if (error instanceof ConflictException) {
  //       throw error;
  //     }
  //     console.error('User creation failed:', error);
  //     throw new InternalServerErrorException('Something went wrong');
  //   }
  //   const otp = generateOtp(4);
  //   const otpExpiry = new Date(Date.now() + 60 * 1000);
  //   createUserDto.otp = otp;
  //   createUserDto.otp_expires_at = otpExpiry;

  //   const user = await this.userModel.create({ ...createUserDto });

  //   return {
  //     user,
  //     message: 'User created successfully. OTP sent to your email.',
  //   };
  // }

  // async findAll(): Promise<User[]> {
  //   return this.userModel.findAll();
  // }

  // async findByEmail(email: string): Promise<User | null> {
  //   return this.userModel.findOne({ where: { email } });
  // }
}
