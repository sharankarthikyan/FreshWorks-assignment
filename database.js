const fs = require("fs");
const chalk = require("chalk");
const moment = require("moment");

const createData = (mail, data, ttl = null) => {
  const database = loadDatabase();

  const duplicateData = database.filter((data) => {
    return data.mail === mail;
  });

  const creationTime = moment().format("LTS");

  if (duplicateData.length === 0) {
    database.push({
      mail: mail,
      data: data,
      ttl: ttl,
      time: creationTime,
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
    if (data.ttl === null) {
      console.log(
        chalk.blue("Time To Live is null. Anytime you can access this data.")
      );
      console.log(chalk.green("Hola, We retrived a data as JSON :)\n"));
      console.log(JSON.stringify(data));
    } else {
      const creationTime = moment(data.time, "h:mm:ss a")
        .add(data.ttl, "minutes")
        .format("LTS");

      const currentTime = moment().format("LTS");
      var beginningTime = moment(creationTime, "h:mm:ss a");
      var endTime = moment(currentTime, "h:mm:ss a");

      if (beginningTime.isBefore(endTime)) {
        console.log(chalk.red("Data expired..."));
      } else {
        console.log(
          chalk.blue(
            "Data not expired. It will expires on " +
              beginningTime.format("LTS") +
              "."
          )
        );
        console.log(chalk.green("Hola, We retrived a data as JSON :)\n"));
        console.log(JSON.stringify(data));
      }
    }
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
