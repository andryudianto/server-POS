'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudentQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  };
  StudentQuestion.init({
    StudentId: DataTypes.INTEGER,
    QuestionId: DataTypes.INTEGER,
    studentAnswer: DataTypes.STRING,
    point: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'StudentQuestion',
  });
  return StudentQuestion;
};