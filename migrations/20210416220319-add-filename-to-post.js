'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('posts', 'fileName', { type: Sequelize.STRING })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('posts', 'fileName')
  }
}
