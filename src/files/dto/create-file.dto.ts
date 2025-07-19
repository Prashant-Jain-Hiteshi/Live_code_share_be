import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFileDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  content?: string;
}
