'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4
      },
      username: {
          type:DataTypes.STRING,
          allowNull:false
      },
      password:{
        type:DataTypes.STRING,
        allowNull:false
      },
      email: {
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
    await queryInterface.dropTable('users');
  }
};