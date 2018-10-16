#!/usr/bin/env node

const program = require('commander')
const run = require("./resource-generator")
const fs = require("fs")
var configPaths = []
 
program
    .version('0.1.0')
    .arguments('<filePath...>')
    .action((filePaths) => {
        configPaths = filePaths
    })
    .parse(process.argv)

Promise.all(
    configPaths.map(confPath => {
        return new Promise((resolve, reject) => {
            fs.readFile(confPath, (err, data) => {
                if (err) {
                    return reject(err)
                }

                data = JSON.parse(data.toString())

                run(data).then(resolve, reject)
            })
        })
    })
)