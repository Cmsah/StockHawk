'use strict';
const {
  Model
} = require('sequelize');
const transaction = require('./transaction');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Transaction}) {
      // define association here
      // const {transaction} = models;
      this.hasMany(Transaction,{
        foreignKey:'userId',
        as:'Transactions'
      })
    }
    // override to JSON function so that we don't send a attribute to the
    // client when we don't want to for example the default id type 
    toJSON(){
      return {...this.get(),id:undefined}
    }
  }
  user.init({
    uuid:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4
    },
    username: {
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notNull:{msg:'Please enter the Username'},
          notEmpty:{msg:'Empty string isn\'t a valid username'}
        }
      },
    password:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'Please enter the Password'},
        notEmpty:{msg:'Empty string isn\'t a valid password'},
        
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'Please enter the email'},
        notEmpty:{msg:'Empty string isn\'t a valid email'},
        isEmail:{msg:'must be a valid email address'},
      }
    }
  },{
    sequelize,
    modelName: 'user',
    tableName:'users'
  });
  return user;
};