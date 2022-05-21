'use strict';
const { Profile, User } = require('../models')

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('profile', { 
       id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true
       },
       user_id: {
         type: Sequelize.INTEGER,
         allowNull: false,
         references: {
           model: User,
           field: 'id',
         }
       },
       nik: {
         type: Sequelize.STRING,
         allowNull: true
       },
       nama_depan: {
         type: Sequelize.STRING,
         allowNull: false
       },
       nama_belakang: {
         type: Sequelize.STRING,
         allowNull: true
       },
       no_hp: {
         type: Sequelize.STRING,
         allowNull: true
       },
       kode_aktivasi: {
         type: Sequelize.STRING,
         allowNull: true
       },
       is_active: {
         type: Sequelize.BOOLEAN,
         defaultValue: false
       },
       tanggal_lahir: {
         type: Sequelize.DATE,
         allowNull: true,
         defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
       },
       tempat_lahir: {
         type: Sequelize.STRING,
         allowNull: true,
       },
       createdAt: {
         type: Sequelize.DATE,
         defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
         allowNull: true,
       },
       updatedAt: {
         type: Sequelize.DATE,
         defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
         allowNull: true,
       },
      });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('profile')
  }
};
