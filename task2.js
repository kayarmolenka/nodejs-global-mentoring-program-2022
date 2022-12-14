const csv = require("csvtojson");
const fs = require("fs");
const path = require("path");
const { pipeline } = require("stream");

pipeline(
    fs.createReadStream('csv/nodejs-hw1-ex1.csv'),
    csv(),
    fs.createWriteStream(path.resolve(__dirname, "resultTask2.txt")),
    (err) => {
        if (err) {
            console.error('Pipeline failed.', err);
        } else {
            console.log('File was converted!');
        }
    },
)
