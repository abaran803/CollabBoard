'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Checklists', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false, // set to true if you want untitled checklists
    },
    position: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0, // helps ordering within a card
    },
    cardId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Cards',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
    },
  });

  // Helpful index for lookups by card
  await queryInterface.addIndex('Checklists', ['cardId']);
}
export async function down(queryInterface) {
  await queryInterface.dropTable('Checklists');
}
