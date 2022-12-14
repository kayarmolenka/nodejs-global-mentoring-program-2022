import fs from "fs";
import { pipeline } from 'stream'
import csv from "csvtojson";
import path from "path";

pipeline(
    fs.createReadStream('csv/nodejs-hw1-ex1.csv'),
    csv(),
    fs.createWriteStream(path.resolve(__dirname, "resultTask3.txt")),
    (err) => {
        if (err) {
            console.error('Pipeline failed.', err);
        } else {
            console.log('File was converted!');
        }
    },
)