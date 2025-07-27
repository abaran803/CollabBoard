'use strict';
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    avatar_url: Sequelize.TEXT,
    password: Sequelize.STRING,
    googleId: {
      type: Sequelize.STRING,
      unique: true,
    },
    facebookId: {
      type: Sequelize.STRING,
      unique: true,
    },
    googleTokens: Sequelize.JSON,
    facebookTokens: Sequelize.JSON,
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW'),
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW'),
    },
  });
}
export async function down(queryInterface) {
  await queryInterface.dropTable('Users');
}
