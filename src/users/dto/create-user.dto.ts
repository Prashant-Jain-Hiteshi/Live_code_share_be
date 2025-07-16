import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;
  @IsOptional()
  @IsString()
  otp?: string;

  @IsOptional()
  @IsDateString()
  otp_expires_at?: Date;

  @IsOptional()
  @IsBoolean()
  is_verified?: boolean;
}
