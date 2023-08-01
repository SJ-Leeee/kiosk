'use strict';
/* @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Cart_detail_options', 'item_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Items',
        key: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });
    await queryInterface.changeColumn('Cart_detail_options', 'cart_detail_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Cart_details',
        key: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });
    await queryInterface.changeColumn('Cart_detail_options', 'option_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Options',
        key: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });
  },
  async down(queryInterface, Sequelize) {},
};
