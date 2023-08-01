'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({user}) {
      // define association here
      this.belongsTo(user,{
        foreignKey:'userId',
        as:'user'
      });
    }
    // toJSON(){
    //   return {...this.get(),userId:undefined};
    // }
  }
  Transaction.init({
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
    }
  }, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'Transactions'
  });
  return Transaction;
};