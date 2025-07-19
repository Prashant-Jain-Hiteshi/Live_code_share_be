import { IsOptional, IsString } from 'class-validator';

export class UpdateFileDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;
}
