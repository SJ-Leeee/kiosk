'use strict';
/\*_ @type {import('sequelize-cli').Migration} _/;
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cart_detail_options', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Items',
          key: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      },
      cart_detail_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Cart_details',
          key: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      },
      option_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Options',
          key: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cart_detail_options');
  },
};
