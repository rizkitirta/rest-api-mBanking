'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Rekening extends Model {
        static associate(models) {
            // define association here
            Rekening.belongsTo(models.User,{
                foreignKey: 'id',
              });
        }
    }

    Rekening.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        no_rekening: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        no_kartu: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'UTAMA',
        },
        type: {
            type: DataTypes.STRING,
            defaultValue: 'STANDAR',
        },
        nama: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nama_alias: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        alamat: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        tanggal_pembuatan: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
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
    }, {
        sequelize,
        freezeTableName: 'rekening',
        modelName: 'Rekening',
        tableName: 'rekening',
        // timestamps: false
    })

    return Rekening;
}