import sequelize from '@/config/db';
import { CardLabel, CardLabelInstance } from '@/models/CardLabels.model';
import { DataTypes, Model, ModelStatic, UUIDV4 } from 'sequelize';

export interface LabelAttributes {
  id?: string;
  board_id: string;
  name: string;
  color: string;
  attachToCard?: (
    cardId: string,
    labelId: string,
  ) => Promise<CardLabelInstance>;
  detachFromCard?: (cardId: string, labelId: string) => Promise<void>;
}

export interface LabelModel extends ModelStatic<LabelInstance> {
  attachToCard(cardId: string, labelId: string): Promise<CardLabelInstance>;
  detachFromCard(cardId: string, labelId: string): Promise<void>;
}

// Extend Model with the interfaces
export interface LabelInstance
  extends Model<LabelAttributes>,
    LabelAttributes {}

const Label = sequelize.define<LabelInstance>('Label', {
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
}) as LabelModel;

Label.attachToCard = async function (cardId: string, labelId: string) {
  return await CardLabel.create({
    card_id: cardId,
    label_id: labelId,
  });
};

Label.detachFromCard = async function (cardId: string, labelId: string) {
  const association = await CardLabel.findOne({
    where: { card_id: cardId, label_id: labelId },
  });
  if (association) {
    await association.destroy();
  }
};

export default Label;
