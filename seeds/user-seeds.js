const { User } = require('../models');

const userData = [
  {
    username: 'person1',
    password: 'password1'
  },
  {
    username: 'person2',
    password: 'password2'
  },
  {
    username: 'person3',
    password: 'password3'
  },
  {
    username: 'person4',
    password: 'password4'
  },
  {
    username: 'person5',
    password: 'password5'
  }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
