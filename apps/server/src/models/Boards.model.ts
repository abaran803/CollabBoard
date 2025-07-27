import sequelize from '@/config/db';
import { DataTypes, Model, UUIDV4 } from 'sequelize';

export interface BoardAttributes {
  id: string;
  title: string;
  description?: string;
  background_image?: string;
  created_by: string;
  is_private: boolean;
}

// Extend Model with the interfaces
export interface BoardInstance
  extends Model<BoardAttributes>,
    BoardAttributes {}

export const Board = sequelize.define<BoardInstance>('Board', {
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
});
