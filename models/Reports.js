const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Reports extends Model {}

Reports.init(
    {
        id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        },
        title: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [10]
            },
        },
        reported_by: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id",
            },
        },
        status: {
            type: DataTypes.ENUM('pending', 'resolvded', 'closed'),
            defaultValue: 'pending',
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'reports',
    }
);

module.exports = Reports;