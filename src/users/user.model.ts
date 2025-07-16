import {
  Column,
  DataType,
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column
  declare firstName: string;

  @Column
  declare lastName: string;

  @Column({ unique: true })
  declare email: string;

  @Column
  declare otp: string;

  @Column({ type: DataType.DATE })
  declare otp_expires_at: Date;

  @Column({ defaultValue: false })
  declare is_verified: boolean;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
