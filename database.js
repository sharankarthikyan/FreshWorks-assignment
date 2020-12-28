const fs = require("fs");
const chalk = require("chalk");

const createData = (mail, data) => {
  const database = loadDatabase();

  const duplicateData = database.filter((data) => {
    return data.mail === mail;
  });

  if (duplicateData.length === 0) {
    database.push({
      mail: mail,
      data: data,
    });
    saveDatabase(database);
    console.log(
      chalk.green("Success Data Added... :)\n\n") +
        chalk.yellow(
          "Check " +
            chalk.red("database.json") +
            " file in the current project directory."
        )
    );
  } else {
    console.log(
      chalk.red("Sorry, This Mail ID have a data :(\n\n") +
        chalk.yellow(
          "Check " +
            chalk.red("database.json") +
            " file in the current project directory."
        )
    );
  }
};

const readData = (mail) => {
  const database = loadDatabase();
  const data = database.find((data) => {
    return data.mail === mail;
  });

  if (data) {
    console.log(chalk.green("Hola, We retrived a data as JSON :)\n"));
    console.log(JSON.stringify(data));
  } else {
    console.log(
      chalk.red("Data not found... :(\n\n") +
        chalk.yellow(
          "Check " +
            chalk.red("database.json") +
            " file in the current project directory."
        )
    );
  }
};

const deleteData = (mail) => {
  const database = loadDatabase();
  const dataToKeep = database.filter((data) => {
    return data.mail !== mail;
  });
  saveDatabase(dataToKeep);
  if (database.length > dataToKeep.length) {
    console.log(
      chalk.green("User Data Deleted successfully... :)\n\n") +
        chalk.yellow(
          "Check " +
            chalk.red("database.json") +
            " file in the current project directory."
        )
    );
  } else {
    console.log(
      chalk.red("No data found... :(\n\n") +
        chalk.yellow(
          "Check " +
            chalk.red("database.json") +
            " file in the current project directory."
        )
    );
  }
};

const loadDatabase = () => {
  try {
    const dataBuffer = fs.readFileSync("database.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (err) {
    return [];
  }
};

const saveDatabase = (database) => {
  const dataJSON = JSON.stringify(database);
  fs.writeFileSync("database.json", dataJSON);
};

module.exports = {
  createData: createData,
  readData: readData,
  deleteData: deleteData,
};
