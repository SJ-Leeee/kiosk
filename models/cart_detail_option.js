'use strict';
const Sequelize = require('sequelize');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart_detail_option extends Model {
    static associate(models) {
      this.belongsTo(models.Cart_detail, {
        targetKey: 'id',
        foreignKey: 'cart_detail_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      this.belongsTo(models.Item, {
        targetKey: 'id',
        foreignKey: 'item_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      this.belongsTo(models.Option, {
        targetKey: 'id',
        foreignKey: 'option_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Cart_detail_option.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cart_detail_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      option_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    },
    {
      sequelize,
      modelName: 'Cart_detail_option',
    },
  );
  return Cart_detail_option;
};
