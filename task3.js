import fs from "fs";
import { pipeline } from 'stream'
import csv from "csvtojson";
import path from "path";

const rs = fs.createReadStream('csv/nodejs-hw1-ex1.csv');
const ws = fs.createWriteStream(path.resolve(__dirname, "resultTask3.txt"));
const errorHandler = (err) => err ? console.error('Pipeline failed.', err) : console.log('File was converted!');

pipeline(
    rs,
    csv(),
    ws,
    errorHandler
)