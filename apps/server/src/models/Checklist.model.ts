import sequelize from '@/config/db';
import { DataTypes, Model, UUIDV4 } from 'sequelize';

export default interface ChecklistAttributes {
  id?: string;
  title: string;
  position?: number;
  cardId: string;
}

// Extend Model with the interfaces
export interface ChecklistInstance
  extends Model<ChecklistAttributes>,
    ChecklistAttributes {}

export const Checklist = sequelize.define<ChecklistInstance>(
  'Checklist',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false, // set to true if you want untitled checklists
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // ordering within a card
    },
    cardId: {
      type: DataTypes.UUID,
      allowNull: false, // FK → Cards.id (set via migration)
    },
  },
  {
    tableName: 'Checklists',
    timestamps: true,
    indexes: [{ fields: ['cardId'] }],
  },
);
