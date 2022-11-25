'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('todos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      value: {
        type: Sequelize.STRING
      },
      id_kategori: {
        type: Sequelize.INTEGER
      },
      id_level: {
        type: Sequelize.INTEGER
      },
      tag: {
        type: Sequelize.STRING
      },
      deskripsi: {
        type: Sequelize.STRING
      },
      uid: {
        type: Sequelize.INTEGER
      },
      isComplete: {
        type: Sequelize.BOOLEAN
      },
      deletedAt: {
        type: Sequelize.DATE
      },
      isDeleted: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('todos');
  }
};
