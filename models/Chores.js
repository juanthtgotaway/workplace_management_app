const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Chores extends Model {}

Chores.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        chore_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        chore_description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [10]
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id",
            },
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'chores',
    }
);

module.exports = Chores;