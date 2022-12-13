import csv from "csvtojson";
import fs from "fs";
import path from "path";

const ws = fs.createWriteStream(path.resolve(__dirname, "resultFromStream.txt"))

fs.createReadStream('csv/nodejs-hw1-ex1.csv')
    .pipe(csv())
    .on('data', data => {
        ws.write(data, (error) => {
            if(error) {
                console.log(error)
            }
        })
    })
    .on('error', (msg) => console.log(msg));