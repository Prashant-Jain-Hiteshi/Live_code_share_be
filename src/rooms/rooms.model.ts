import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  HasMany,
  CreatedAt,
  UpdatedAt,
  DataType,
} from 'sequelize-typescript';
import { User } from 'src/users/user.model';
import { File } from 'src/files/file.model';
import { RoomParticipant } from './room-participant.model';
export interface RoomCreationAttributes {
  file_id: number;
  created_by: number;
}

@Table({ tableName: 'rooms' })
export class Room extends Model<Room, RoomCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @ForeignKey(() => File)
  @Column(DataType.INTEGER)
  declare file_id: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  declare created_by: number;

  @BelongsTo(() => File)
  declare file: File;

  @BelongsTo(() => User, 'created_by')
  declare creator: User;

  @HasMany(() => RoomParticipant)
  declare participants: RoomParticipant[];

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
