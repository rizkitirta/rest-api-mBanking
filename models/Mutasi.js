'use strict';
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Mutasi extends Model {
        static associations(models) {
            // define association here
            Mutasi.belongsTo(models.Rekening, {
                foreignKey: 'id',
            })
        }
    }

    Mutasi.init({
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
          debet: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
          },
          kredit: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
          },
          saldo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
          },
          type: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          tanggal: {
            allowNull: false,
            type: DataTypes.DATE,
            // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
          keterangan: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
          createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
          updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
            // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          }
    }, {
        sequelize,
        freezeTableName: 'mutasi',
        modelName: 'Mutasi',
        tableName: 'mutasi'
    })

    return Mutasi;
}