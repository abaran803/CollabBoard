import sequelize from '@/config/db';
import { DataTypes, Model, UUIDV4 } from 'sequelize';

export default interface ActivitiesAttributes {
  id: string;
  board_id: string;
  user_id?: string;
  type?: string;
  metadata?: string;
}

// Extend Model with the interfaces
export interface ActivitiesInstance
  extends Model<ActivitiesAttributes>,
    ActivitiesAttributes {}

export const Activity = sequelize.define<ActivitiesInstance>('Activity', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  board_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.UUID,
  },
  type: { type: DataTypes.STRING(50) },
  metadata: {
    type: DataTypes.JSONB,
  },
});
