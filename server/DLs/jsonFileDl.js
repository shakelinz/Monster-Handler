const jf = require("jsonfile");

const readData = (path) => {
  try {
    return jf.readFile(path);
  } catch (error) {
    return error.massage;
  }
};

// save data to local file
const saveData = (path, data) => {
  try {
    return jf.writeFile(path, data);
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  readData,
  saveData
};