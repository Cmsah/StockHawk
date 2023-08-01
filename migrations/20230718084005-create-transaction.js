'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      uuid:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4
      },
      AssetClass: {
        type:DataTypes.STRING,
        allowNull:false
      },
      Symbol: {
        type:DataTypes.STRING,
        allowNull:false
      },
      PurchaseDate: {
        type:DataTypes.DATE,
        allowNull:false
      },
      quantity: {
        type:DataTypes.STRING,
        allowNull:false
      },
      PurchasePrice: {
        type:DataTypes.STRING,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};