import sequelize from '@/config/db';
import { BoardMember, BoardMemberInstance } from '@/models/BoardMembers.model';
import { DataTypes, Model, ModelStatic, UUIDV4 } from 'sequelize';

export interface BoardAttributes {
  id?: string;
  title: string;
  description?: string;
  background_image?: string;
  created_by: string;
  is_private: boolean;
  addUser?: (
    boardId: string,
    userId: string,
    role: string,
  ) => Promise<BoardMemberInstance>;
}

// Extend Model with the interfaces
export interface BoardInstance
  extends Model<BoardAttributes>,
    BoardAttributes {}

export interface BoardModel extends ModelStatic<BoardInstance> {
  addUser(
    boardId: string,
    userId: string,
    role: string,
  ): Promise<BoardMemberInstance>;
}

const Board = sequelize.define<BoardInstance>('Board', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  background_image: {
    type: DataTypes.TEXT,
  },
  created_by: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  is_private: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}) as BoardModel;

Board.addUser = async function (boardId: string, userId: string, role: string) {
  return await BoardMember.create({
    board_id: boardId,
    user_id: userId,
    role,
  });
};

export default Board;
