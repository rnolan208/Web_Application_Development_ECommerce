//create array for storing user data
const users = [];

function createUser(username, password) {
    users.push({username, password});
    console.log(users);
}

module.exports = createUser;