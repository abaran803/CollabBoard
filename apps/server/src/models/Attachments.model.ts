import sequelize from '@/config/db';
import { DataTypes, Model, UUIDV4 } from 'sequelize';

export default interface AttachmentsAttributes {
  id: string;
  card_id: string;
  file_url: string;
  uploaded_by?: string;
}

// Extend Model with the interfaces
export interface AttachmentsInstance
  extends Model<AttachmentsAttributes>,
    AttachmentsAttributes {}

export const Attachment = sequelize.define<AttachmentsInstance>('Attachment', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  card_id: {
    type: DataTypes.UUID(),
    allowNull: false,
  },
  file_url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  uploaded_by: {
    type: DataTypes.UUID,
  },
});
