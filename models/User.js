const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(login){
        // this referring to the entry
        return bcrypt.compareSync(login, this.password);
    }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4]
      }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [4]
        }
    }
  },
  {
    hooks: {
        async beforeBulkCreate(newUserList){
            const dataList = await Promise.all(newUserList.map( async (userData) => {
                userData.password = await bcrypt.hash(userData.password, 10);
                return userData;
            }));
            return dataList;
        },
        async beforeCreate(userData){
            userData.password = await bcrypt.hash(userData.password, 10);
            return userData
        },
        async beforeUpdate(userData){
            userData.password = await bcrypt.hash(userData.password, 10);
            return userData
        }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: false,
    modelName: 'user'
  }
);

module.exports = User;
