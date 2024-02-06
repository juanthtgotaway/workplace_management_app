const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Departments extends Model {}

Departments.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        department_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        manager: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'departments',
    }
);

module.exports = Departments;