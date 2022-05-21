'use strict';
const {
    Model
} = require('sequelize');
const User = require('../models')

module.exports = (sequelize, DataTypes) => {
    class Profile extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Profile.belongsTo(models.User, {
                foreignKey: 'id',
            });
        }
    }
    Profile.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        nik: {
            type: DataTypes.STRING,
            allowNull: true
        },
        nama_depan: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nama_belakang: {
            type: DataTypes.STRING,
            allowNull: true
        },
        no_hp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tanggal_lahir: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        tempat_lahir: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            // defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: true,
        },
        updatedAt: {
            type: DataTypes.DATE,
            // defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'Profile',
        tableName: 'profile',
        freezeTableName: 'profile',
    });

    return Profile;
};