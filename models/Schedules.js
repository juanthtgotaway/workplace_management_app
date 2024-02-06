const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');


class Schedules extends Model {}


Schedules.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            types: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user",
                key: "id",
            },
        },
        day: {
            // type: DataTypes.DATE, should date or string be used?
            type: DataTypes.STRING,
            allowNull: false,
        },
        startTime: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        endTime: {
            type: DataTypes.TIME,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: "schedules",
    }
);

module.exports = Schedules;