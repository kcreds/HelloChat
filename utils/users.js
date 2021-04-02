const users = [];

// doloczanie do czatu
function userJoin(id, username, room) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

// aktualni uzyt.
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

// wychodzenie z czatu
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// uzyt. w pokojach
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
};
