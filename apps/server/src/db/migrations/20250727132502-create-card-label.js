'use strict';
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('CardLabels', {
    cardId: {
      type: Sequelize.UUID,
      references: {
        model: 'Cards',
        key: 'id',
      },
      primaryKey: true,
    },
    labelId: {
      type: Sequelize.UUID,
      references: {
        model: 'Labels',
        key: 'id',
      },
      primaryKey: true,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });
}
export async function down(queryInterface) {
  await queryInterface.dropTable('CardLabels');
}
