const csv = require("csvtojson");
const fsPromise = require("fs/promises");
const path = require("path");

csv()
  .fromFile("csv/nodejs-hw1-ex1.csv")
  .then((jsonObj) => {
    console.log(JSON.stringify(jsonObj));
    fsPromise
      .writeFile(
        path.resolve(__dirname, "result.txt"),

        JSON.stringify(jsonObj, null, 4)
      )
      .then(() => console.log("File was converted"))
      .catch((error) => console.log(error));
  });
