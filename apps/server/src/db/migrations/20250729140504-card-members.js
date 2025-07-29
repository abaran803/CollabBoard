// migration: create-card-members.js
'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('CardMembers', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    cardId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: { model: 'Cards', key: 'id' },
      onDelete: 'CASCADE',
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: { model: 'Users', key: 'id' },
      onDelete: 'CASCADE',
    },
    assignedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW'),
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW'),
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW'),
    },
  });

  await queryInterface.addConstraint('CardMembers', {
    fields: ['cardId', 'userId'],
    type: 'unique',
    name: 'unique_card_user',
  });
}
export async function down(queryInterface) {
  await queryInterface.dropTable('CardMembers');
}
