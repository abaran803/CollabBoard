import sequelize from '@/config/db';
import { DataTypes, Model } from 'sequelize';

export default interface CardLabelAttributes {
  card_id: string;
  label_id: string;
}

// Extend Model with the interfaces
export interface CardLabelInstance
  extends Model<CardLabelAttributes>,
    CardLabelAttributes {}

export const CardLabel = sequelize.define<CardLabelInstance>('CardLabel', {
  card_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  label_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});
