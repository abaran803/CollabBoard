'use strict';
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Labels', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    title: Sequelize.STRING,
    color: Sequelize.STRING,
    boardId: {
      type: Sequelize.UUID,
      references: {
        model: 'Boards',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });
}
export async function down(queryInterface) {
  await queryInterface.dropTable('Labels');
}
