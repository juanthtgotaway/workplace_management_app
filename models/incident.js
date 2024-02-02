const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Incident extends Model {}

Incident.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
     description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
     reported_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        refrences: {
            model: 'users',
            key: 'id',
        }
    },
    status: {
        type: DataTypes.ENUM('pending', 'resolved', 'closed'),
        defaultValue: 'pending',
    },
  },
 {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'incident',
 },
)

module.export = Incident;