'use strict';
const { Model } = require('sequelize');
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Cart_detail_option, {
        sourceKey: 'id',
        foreignKey: 'item_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      this.hasMany(models.Order_item, {
        sourceKey: 'id',
        foreignKey: 'item_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      this.hasMany(models.Option, {
        sourceKey: 'id',
        foreignKey: 'item_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      this.hasMany(models.Cart_detail, {
        sourceKey: 'id',
        foreignKey: 'item_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Item.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('Food', 'Drink', 'Snack'),
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
      modelName: 'Item',
    },
  );
  return Item;
};
