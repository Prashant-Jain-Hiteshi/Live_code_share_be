import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { JoinRoomDto } from './dto/join-room.dto';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';
import { JwtAuthGuard } from 'src/common/jwtauthguard/authguard';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post('join')
  @UseGuards(JwtAuthGuard)
  async joinRoom(@Body() dto: JoinRoomDto, @Req() req: RequestWithUser) {
    return this.roomsService.joinRoom(dto, req.user.userId);
  }
}
