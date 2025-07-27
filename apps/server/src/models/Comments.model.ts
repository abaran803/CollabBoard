import sequelize from '@/config/db';
import { DataTypes, Model, UUIDV4 } from 'sequelize';

export default interface CommentAttributes {
  id: string;
  card_id: string;
  user_id: string;
  content: string;
}

// Extend Model with the interfaces
export interface CommentInstance
  extends Model<CommentAttributes>,
    CommentAttributes {}

export const Comment = sequelize.define<CommentInstance>('Comment', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  card_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
