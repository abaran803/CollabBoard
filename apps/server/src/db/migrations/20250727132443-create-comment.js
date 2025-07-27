'use strict';
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Comments', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    text: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    cardId: {
      type: Sequelize.UUID,
      references: {
        model: 'Cards',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    userId: {
      type: Sequelize.UUID,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });
}
export async function down(queryInterface) {
  await queryInterface.dropTable('Comments');
}
