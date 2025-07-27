'use strict';
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Checklists', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    title: Sequelize.STRING,
    cardId: {
      type: Sequelize.UUID,
      references: {
        model: 'Cards',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });
}
export async function down(queryInterface) {
  await queryInterface.dropTable('Checklists');
}
