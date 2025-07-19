import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  DataType,
} from 'sequelize-typescript';
import { Room } from './rooms.model';
import { User } from 'src/users/user.model';
export interface RoomParticipantCreationAttributes {
  room_id: number;
  user_id: number;
}

@Table({ tableName: 'room_participants' })
export class RoomParticipant extends Model<
  RoomParticipant,
  RoomParticipantCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @ForeignKey(() => Room)
  @Column(DataType.INTEGER)
  declare room_id: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  declare user_id: number;

  @BelongsTo(() => Room)
  declare room: Room;

  @BelongsTo(() => User)
  declare user: User;

  @CreatedAt
  declare joined_at: Date;
}
