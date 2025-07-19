import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from 'src/users/user.model';

export interface FileCreationAttributes {
  title: string;
  content?: string;
  owner_id: number;
}

@Table({ tableName: 'files' })
export class File extends Model<File, FileCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column({ allowNull: false })
  declare title: string;

  @Column({ type: DataType.TEXT })
  declare content: string;

  @ForeignKey(() => User)
  @Column
  declare owner_id: number;

  @BelongsTo(() => User)
  declare owner: User;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
