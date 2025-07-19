import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Room } from './rooms.model';
import { RoomParticipant } from './room-participant.model';
import { File } from 'src/files/file.model';
import { JoinRoomDto } from './dto/join-room.dto';
import { User } from 'src/users/user.model';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room) private readonly roomModel: typeof Room,
    @InjectModel(RoomParticipant)
    private readonly participantModel: typeof RoomParticipant,
    @InjectModel(File) private readonly fileModel: typeof File,
  ) {}

  async joinRoom(dto: JoinRoomDto, userId: number) {
    try {
      // Validate file existence
      const file = await this.fileModel.findByPk(dto.fileId);
      if (!file) {
        throw new NotFoundException('File not found');
      }

      // Find or create room for this file
      let room = await this.roomModel.findOne({
        where: { file_id: dto.fileId },
      });

      if (!room) {
        room = await this.roomModel.create({
          file_id: dto.fileId,
          created_by: userId,
        });
      }

      // Check if user is already a participant
      const existingParticipant = await this.participantModel.findOne({
        where: { room_id: room.id, user_id: userId },
      });

      if (!existingParticipant) {
        await this.participantModel.create({
          room_id: room.id,
          user_id: userId,
        });
      }

      // Fetch updated participants list
      const participants = await this.participantModel.findAll({
        where: { room_id: room.id },
        include: [{ model: User, attributes: ['id', 'firstName', 'lastName'] }],
      });

      return {
        message: 'Joined room successfully',
        room: {
          id: room.id,
          file: {
            id: file.id,
            title: file.title,
            content: file.content,
          },
        },
        participants: participants.map((p) => ({
          id: p.user.id,
          name: `${p.user.firstName} ${p.user.lastName}`,
        })),
      };
    } catch (error) {
      console.error('Error joining room:', error);
      throw new InternalServerErrorException('Failed to join room');
    }
  }
}
