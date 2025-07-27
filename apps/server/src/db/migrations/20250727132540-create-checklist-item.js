'use strict';
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('ChecklistItems', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    title: Sequelize.STRING,
    isCompleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    checklistId: {
      type: Sequelize.UUID,
      references: {
        model: 'Checklists',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });
}
export async function down(queryInterface) {
  await queryInterface.dropTable('ChecklistItems');
}
