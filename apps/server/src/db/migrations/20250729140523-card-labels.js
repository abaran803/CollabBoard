// migration: create-card-labels.js
'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('CardLabels', {
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
    labelId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: { model: 'Labels', key: 'id' },
      onDelete: 'CASCADE',
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

  await queryInterface.addConstraint('CardLabels', {
    fields: ['cardId', 'labelId'],
    type: 'unique',
    name: 'unique_card_label',
  });
}
export async function down(queryInterface) {
  await queryInterface.dropTable('CardLabels');
}
