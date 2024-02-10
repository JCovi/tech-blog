const { User } = require('../models');

const userData = [
    {
        "username": "Jc",
        "email": "Josh@test.com",
        "password": "12345678"
    },
    {
        "username": "Joe",
        "email": "Joshy@test.com",
        "password": "0987654321"
    },
    {
        "username": "Jane",
        "email": "jane@test.com",
        "password": "janeIsCool"
    }
]

const userPosts = () => User.bulkCreate(userData,{individualHooks:true});

module.exports = userPosts;