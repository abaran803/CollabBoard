import sequelize from '@/config/db';
import { DataTypes, Model } from 'sequelize';

// Define the attributes interface
export interface UserAttributes {
  id?: string;
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

// Extend Model with the interfaces
export interface UserInstance extends Model<UserAttributes>, UserAttributes {}

// Define the model using the interfaces
export const User = sequelize.define<UserInstance>(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Email is Required',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {},
);
