'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {foreignKey: 'userId'})
      this.belongsTo(models.Country, {foreignKey: 'countryId'})
      this.belongsTo(models.Category, {foreignKey: 'categoryId'})
    }
  }
  News.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    summary: DataTypes.STRING,
    image: DataTypes.STRING,
    isPublished: DataTypes.BOOLEAN,
    total_like: DataTypes.INTEGER,
    countryId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'News',
  });
  return News;
};