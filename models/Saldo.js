'use strict';
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Saldo extends Model {
        static associations(models) {
            // define association here
            Saldo.belongsTo(models.Rekening, {
                foreignKey: 'id',
            })
        }
    }
    Saldo.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        rekening_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // references: {
            //   table: 'rekening',
            //   field: 'id'
            // }
        },
        saldo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        }
    })
}