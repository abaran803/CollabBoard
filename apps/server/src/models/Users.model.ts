import sequelize from '@/config/db';
import { DataTypes, Model, Optional } from 'sequelize';

// Define the attributes interface
export interface UserAttributes {
  id?: string;
  firstName: string;
  lastName?: string;
  email: string;
  avatar_url?: string;
  password?: string; // optional for social login
  googleId?: string;
  facebookId?: string;
  googleTokens?: {
    accessToken: string;
    refreshToken: string;
  };
  facebookTokens?: {
    accessToken: string;
    refreshToken: string;
  };
}

// Extend Model with the interfaces
export interface UserInstance
  extends Model<UserAttributes, Optional<UserAttributes, 'id' | 'password'>>,
    UserAttributes {}

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
    avatar_url: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue:
        'https://images.unsplash.com/photo-1474447976065-67d23accb1e3?q=80&w=385&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true, // null for social login users
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    facebookId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    googleTokens: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    facebookTokens: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {},
);
