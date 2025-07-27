'use strict';
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Cards', {
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
    description: Sequelize.TEXT,
    due_date: Sequelize.DATE,
    position: Sequelize.INTEGER,
    listId: {
      type: Sequelize.UUID,
      references: {
        model: 'Lists',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    created_by: {
      type: Sequelize.UUID,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });
}
export async function down(queryInterface) {
  await queryInterface.dropTable('Cards');
}
