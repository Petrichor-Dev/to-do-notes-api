'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kategori extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  kategori.init({
    nama_kategori: DataTypes.STRING,
    uid: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'kategori',
  });
  return kategori;
};
