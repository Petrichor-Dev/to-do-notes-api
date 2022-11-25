'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  todo.init({
    value: DataTypes.STRING,
    id_kategori: DataTypes.INTEGER,
    id_level: DataTypes.INTEGER,
    tag: DataTypes.STRING,
    deskripsi: DataTypes.STRING,
    uid: DataTypes.INTEGER,
    isComplete: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'todo',
  });
  return todo;
};
