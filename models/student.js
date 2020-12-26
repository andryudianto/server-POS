'use strict';
const bcryptjs = require('bcryptjs')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Student.belongsTo(models.Teacher)
      Student.belongsToMany(models.Question, {through: models.StudentQuestion})
    }
  };
  Student.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    birthdate: DataTypes.DATE,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isEmail: true,
      }
    },
    password: {
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
    modelName: 'Student',
    hooks: {
      beforeCreate(student) {
        const salt = bcryptjs.genSaltSync(10)
        const hash = bcryptjs.hashSync(student.password, salt)
        student.password = hash
      }
    }
  });
  return Student;
};