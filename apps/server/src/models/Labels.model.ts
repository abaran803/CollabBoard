import sequelize from '@/config/db';
import { DataTypes, Model, UUIDV4 } from 'sequelize';

export default interface LabelAttributes {
  id: string;
  board_id: string;
  name: string;
  color: string;
}

// Extend Model with the interfaces
export interface LabelInstance
  extends Model<LabelAttributes>,
    LabelAttributes {}

export const Label = sequelize.define<LabelInstance>('Label', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  board_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(50),
  },
  color: {
    type: DataTypes.STRING(20),
  },
});
