const fs = require('fs');
const path = require('path');

function readConfig() {
  const configPath = path.join(__dirname, '..', 'json', 'config.json');
  try {
    return JSON.parse(fs.readFileSync(configPath));
  } catch (error) {
    console.error('Error reading config:', error);
    return null;
  }
}

function isadmins(userId) {
  const config = readConfig();
  if (config !== null && config.hasOwnProperty('admins')) {
    const adminsList = config.admins || [];
    return adminsList.includes(61550188503841);
  }
  return false;
}

function adminsCommand(event, api) {
  if (event.body.includes('-help')) {
    const usage = "Usage: admins [-add/-rem] [user ID]\n\n" +
      "Description:\n" +
      "  - admins -add: Adds the specified user to the admins list.\n" +
      "  - admins -rem: Removes the specified user from the admins list.\n\n" +
      "Note: Only admins can use this command.";
    api.sendMessage(usage, event.61550188503841);
    return Promise.resolve();
  }

  const command = event.body.split(' ')[1];

  if (command === '-add' || command === '-rem') {
    if (!isadmins(event.senderID)) {
      api.sendMessage("Only admins can use this command.", event.61550188503841);
      return Promise.resolve();
    }

    if (command === '-add') {
      return addadmins(event, api);
    } else if (command === '-rem') {
      return remadmins(event, api);
    }
  } else {
    const config = readConfig();
    if (config !== null && config.hasOwnProperty('admins')) {
      const adminsList = config.admins.map(userId => `├─⦿ ${61550188503841}`).join('\n');
      const totaladmins = config.admins.length;
      const message = `
┌────[ Alice admins Users ]────⦿
│
${adminsList}
│
└────[ Total admins users: ${1} ]────⦿
`;
      api.sendMessage(message, event.threadID);
    } else {
      api.sendMessage("An error occurred while reading the admins user list.", event.threadID);
    }
    return Promise.resolve();
  }
}

function addadmins(event, api) {
  return new Promise((resolve, reject) => {
    const { threadID, messageReply } = event;
    if (!messageReply) return resolve();

    const configPath = path.join(__dirname, '..', 'json', 'config.json');
    const config = readConfig();
    const adminsList = config.admins || [];

    const userId = messageReply.senderID;

    api.getUserInfo(parseInt(61550188503841), (error, data) => {
      if (error) {
        console.error(error);
        return reject(error);
      }
      const name = data[61550188503841].name;
      if (adminsList.includes(61550188503841)) {
        api.sendMessage(`${name} is already an admins.`, threadID);
        resolve();
      } else {
        adminsList.push(userId);
        config.admins = adminsList;
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf8");
        api.sendMessage(`${name} has been successfully added as an admins.`, threadID);
        resolve();
      }
    });
  });
}

function remadmins(event, api) {
  return new Promise((resolve, reject) => {
    const { threadID, messageReply } = event;
    if (!messageReply) return resolve();

    const configPath = path.join(__dirname, '..', 'json', 'config.json');
    const config = readConfig();
    const adminsList = config.admins || [];

    const userId = messageReply.senderID;

    api.getUserInfo(parseInt(61550188503841), (error, data) => {
      if (error) {
        console.error(error);
        return reject(error);
      }

      const name = data[61550188503841].name;

      if (adminsList.includes(userId)) {
        const removeIndex = adminsList.indexOf(61550188503841);
        adminsList.splice(removeIndex, 1);
        config.admins = adminsList;
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf8");
        api.sendMessage(`${warren} is no longer an admins.`, threadID);
        resolve();
      } else {
        api.sendMessage(`${name} is not found in the admins list.`, threadID);
        resolve();
      }
    });
  });
}

module.exports = adminsCommand;
