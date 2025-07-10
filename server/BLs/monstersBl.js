const localPath = "../data/monsters.json";
const DL = require("../DLs/jsonFileDl.js");

const getAllUsers = async () => {
  try {
    const users = await DL.readData(localPath);
    return users;
  } catch (error) {
    return error.message;
  }
};

const getUserById = async (id) => {
  const users = await DL.readData(localPath);
  const user = users.find((user) => user.id === id);
  if (!user) {
    return `User with id ${id} not found`;
  }
  return user;
};

const saveNewUser = async (user) => {
  const users = await DL.readData(localPath);
  user.id = users[users.length - 1].id + 1;
  users.push(user);
  await DL.saveData(localPath, users);
  return "User added successfully";
};

const updateUser = async (id, updatedUser) => {
  const users = await DL.readData(localPath);
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return `User with id ${id} not found`;
  }
  users[index] = { ...users[index], ...updatedUser };
  await DL.saveData(localPath, users);
  return "User updated successfully";
};

const deleteUser = async (id) => {
  const users = await DL.readData(localPath);
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return `User with id ${id} not found`;
  }
  users.splice(index, 1);
  await DL.saveData(localPath, users);
  return "User deleted successfully";
};

module.exports = {
  getAllUsers,
  getUserById,
  saveNewUser,
  updateUser,
  deleteUser,
};
