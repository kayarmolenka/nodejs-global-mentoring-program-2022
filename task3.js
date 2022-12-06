import csv from "csvtojson";

import fsPromise from "fs/promises";
import path from "path";

csv()
  .fromFile("csv/nodejs-hw1-ex1.csv")
  .then((jsonObj) => {
    fsPromise
      .writeFile(
        path.resolve(__dirname, "result.txt"),

        JSON.stringify(jsonObj, null, 4)
      )
      .then(() => console.log("File was converted"))
      .catch((error) => console.log(error));
  });
