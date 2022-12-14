const csv = require("csvtojson");
const fs = require("fs");
const path = require("path");
const { pipeline } = require("stream");

const readStream = fs.createReadStream('csv/nodejs-hw1-ex1.csv');
const writeStream = fs.createWriteStream(path.resolve(__dirname, "resultTask2.txt"));
const errorHandler = (err) => err ? console.error('Pipeline failed.', err) : console.log('File was converted!');


pipeline(
    readStream,
    csv(),
    writeStream,
    errorHandler
)