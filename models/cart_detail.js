'use strict';
const { Model } = require('sequelize');
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart_detail extends Model {
    static associate(models) {
      this.hasMany(models.Cart_detail_option, {
        sourceKey: 'id',
        foreignKey: 'cart_detail_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      this.belongsTo(models.Cart, {
        targetKey: 'id',
        foreignKey: 'cart_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      this.belongsTo(models.Item, {
        targetKey: 'id',
        foreignKey: 'item_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Cart_detail.init(
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
      cart_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      amount: {
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
      modelName: 'Cart_detail',
    },
  );
  return Cart_detail;
};
