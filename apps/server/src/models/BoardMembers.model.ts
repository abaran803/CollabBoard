import sequelize from '@/config/db';
import { DataTypes, Model } from 'sequelize';

export interface BoardMemberAttributes {
  board_id: string;
  user_id: string;
  role: string;
}

// Extend Model with the interfaces
export interface BoardMemberInstance
  extends Model<BoardMemberAttributes>,
    BoardMemberAttributes {}

export const BoardMember = sequelize.define<BoardMemberInstance>(
  'BoardMember',
  {
    board_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(20),
      defaultValue: 'member',
    },
  },
);
