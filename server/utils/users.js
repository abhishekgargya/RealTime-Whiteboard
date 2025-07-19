const users = [];

const addUser = ({ socketId, name, userId, roomId, host, presenter }) => {
  const user = { socketId, name, userId, roomId, host, presenter };
  users.push(user);
  return users.filter((user) => user.roomId === roomId);
};

const removeUser = (socketId) => {
  const index = users.findIndex((user) => user.socketId === socketId);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => {
  return users.find((user) => user.userId === id);
};

const getUsersInRoom = (roomId) => {
  return users.filter((user) => user.roomId === roomId);
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};
