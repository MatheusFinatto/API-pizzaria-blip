const fs = require("fs")

async function read(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path,{encoding: "utf-8"}, (err, data) => {
            resolve(data)
        })
    })
}

async function write(path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, (err) => {
            if (err) reject(err);
            resolve(err)
        })
    })
}

module.exports = {write, read}