'use strict';
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Lists', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    position: {
      type: Sequelize.INTEGER,
    },
    boardId: {
      type: Sequelize.UUID,
      references: {
        model: 'Boards',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });
}
export async function down(queryInterface) {
  await queryInterface.dropTable('Lists');
}
