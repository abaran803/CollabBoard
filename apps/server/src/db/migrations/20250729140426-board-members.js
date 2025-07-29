// migration: create-board-members.js
'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('BoardMembers', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    boardId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: { model: 'Boards', key: 'id' },
      onDelete: 'CASCADE',
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: { model: 'Users', key: 'id' },
      onDelete: 'CASCADE',
    },
    role: {
      type: Sequelize.STRING,
      defaultValue: 'member',
    },
    invitedAt: {
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

  await queryInterface.addConstraint('BoardMembers', {
    fields: ['boardId', 'userId'],
    type: 'unique',
    name: 'unique_board_user',
  });
}
export async function down(queryInterface) {
  await queryInterface.dropTable('BoardMembers');
}
