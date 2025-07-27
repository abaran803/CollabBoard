import sequelize from '@/config/db';
import { DataTypes, Model } from 'sequelize';

export default interface CardMemberAttributes {
  card_id: string;
  user_id: string;
}

// Extend Model with the interfaces
export interface CardMemberInstance
  extends Model<CardMemberAttributes>,
    CardMemberAttributes {}

export const CardMember = sequelize.define<CardMemberInstance>('CardMember', {
  card_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});
