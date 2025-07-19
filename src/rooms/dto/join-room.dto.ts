import { IsNotEmpty, IsNumber } from 'class-validator';

export class JoinRoomDto {
  @IsNumber()
  @IsNotEmpty()
  fileId: number;
}
