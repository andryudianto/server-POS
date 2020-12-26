'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lesson.belongsTo(models.Teacher)
      Lesson.hasMany(models.Course)
    }
  };
  Lesson.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    TeacherId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Lesson',
  });
  return Lesson;
};