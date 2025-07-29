import sequelize from '@/config/db';
import { DataTypes, Model, UUIDV4 } from 'sequelize';

export default interface ListAttributes {
  id?: string;
  board_id: string;
  title: string;
  position?: number;
}

// Extend Model with the interfaces
export interface ListInstance extends Model<ListAttributes>, ListAttributes {}

export const List = sequelize.define<ListInstance>('List', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  board_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});
