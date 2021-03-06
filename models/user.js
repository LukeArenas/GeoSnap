const { uuid } = require('uuidv4')
const { Model } = require('sequelize')
const { deleteFile } = require('../aws')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post, { foreignKey: 'userId' })
      User.hasMany(models.Comment, { foreignKey: 'userId' })
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        validate: { isEmail: true },
        unique: true
      },
      passwordDigest: {
        type: DataTypes.STRING,
        allowNull: false
      },
      profilePicture: {
        type: DataTypes.STRING,
        defaultValue: 'https://i.imgur.com/od6ga6F.png'
      },
      fileName: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      hooks: {
        beforeDestroy: async (fields) => {
          await deleteFile(fields.fileName)
        }
      } //removes profile picture from aws before destroying user
    }
  )
  User.beforeCreate((user, _) => {
    return (user.id = uuid())
  })
  return User
}
