const { argv } = require("yargs");
const yargs = require("yargs");
const chalk = require("chalk");
const database = require("./database");

yargs.command({
  command: "create",
  describe:
    "Create a data.\nExample:" +
    chalk.green(' node app.js create --mail="your mail id" --data="your data"'),
  builder: {
    mail: {
      describe: chalk.yellow(
        "User Mail ID. " + chalk.red.bgYellow.bold("(This is your KEY)")
      ),
      demandOption: true,
      type: String,
    },
    data: {
      describe: chalk.yellow("User Data"),
      demandOption: true,
      type: String,
    },
    ttl: {
      describe: "Time To Live (in mins)",
      demandOption: false,
      type: Number,
    },
  },
  handler: function (argv) {
    database.createData(argv.mail, argv.data, argv.ttl);
  },
});

yargs.command({
  command: "read",
  describe:
    "Read a data\nExample: " +
    chalk.green('node app.js read --mail="your mail id"'),
  builder: {
    mail: {
      describe: chalk.yellow("Read data by using mail ID"),
      demandOption: true,
      type: String,
    },
  },
  handler: function (argv) {
    database.readData(argv.mail);
  },
});

yargs.command({
  command: "delete",
  describe:
    "Delete a data\nExample: " +
    chalk.green('node app.js delete --mail="your mail id"'),
  builder: {
    mail: {
      describe: chalk.yellow("Delete Data by using mail ID"),
      demandOption: true,
      type: String,
    },
  },
  handler: function (argv) {
    database.deleteData(argv.mail);
  },
});

yargs.parse();
