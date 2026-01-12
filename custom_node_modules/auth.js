//create array for storing user data
const users = [];

function createUser(username, password) {
    users.push({username, password});
    console.log(users);
}

function authenticateUser(username, password) {
    //find user by username in array
    const checkUser = users.find(user => user.username === username);

    //if statement to check if user is within array and password is correct
    if (!checkUser || checkUser.password !== password) {
        return false
    }
    return true;
}

module.exports = {createUser, authenticateUser};
