import sequelize from '@/config/db';
import { DataTypes, Model, UUIDV4 } from 'sequelize';

export default interface CardAttributes {
  id: string;
  list_id: string;
  title: string;
  description?: string;
  due_date?: string;
  position: number;
  created_by?: string;
}

// Extend Model with the interfaces
export interface ListInstance extends Model<CardAttributes>, CardAttributes {}

export const Card = sequelize.define<ListInstance>('Card', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  list_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  due_date: {
    type: DataTypes.DATE,
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_by: {
    type: DataTypes.UUID,
  },
});
