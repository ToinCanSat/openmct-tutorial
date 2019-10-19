const fs=require("fs")
const csv = fs.readFileSync(__dirname +"/data.csv").toString()
const lines = csv.split("\r\n")
const headers = lines[0].split(",")
const result = []
for (let row = 1; row < lines.length; row++) {
    const values = lines[row].split(",")
    const data = {}
    for (let col = 0; col < values.length; col++) {
        const value = values[col];
        const header = headers[col]
        data[header] = value
    }
    result.push(data)
}

module .exports = result