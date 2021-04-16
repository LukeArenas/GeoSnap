'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('users', 'fileName', { type: Sequelize.STRING })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('users', 'fileName')
  }
}
