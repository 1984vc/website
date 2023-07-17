#!/usr/bin/env node
import fs from 'fs/promises'
import path from 'path'

const getRowVals = (row) => row.c.map(r => r && r.v ? r.v : '')

const mapRowToHeaders = (headers, row) => {
    const values = getRowVals(row)
    const result = {}
    headers.forEach((header, idx) => {
      if (header === 'Filters') {
        result[header] = values[idx].split(' ')
      } else {
        result[header] = values[idx]
      }
    });

    return result
}

const main = async (id) => {
    try {
        const response = await fetch(`https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json&tq&gid=0`)
        const body = ((await response.text())).slice(47,-2)
        const result = JSON.parse(body)
    } catch (error) {
        throw new Error(`Fetch operation failed: ${error.message}`);
    }
    const headers = getRowVals(result.table.rows.shift())
    const rows = result.table.rows.map((row) => {
        return mapRowToHeaders(headers, row)
    })

    // Sanity check if this seems wrong. If so, throw an error and stop a deploy
    const requiredFields = ['Name', 'Description', 'URL']
    const validRowLen = rows.filter((row) => {
        for (const field of requiredFields) {
            if (!row[field] || row[field].length === 0) {
                console.error("Invalid row:", row)
                return false
            }
        }
        return true
    }).length
    if (rows.length !== validRowLen) {
        throw new Error("Incorrect number of rows")
    }

    const jsonStr = JSON.stringify(rows, null, 4)
    console.log(`Downloaded ${rows.length} rows from portfolio spreadsheet`)
    await fs.mkdir('./data', {recursive: true})
    await fs.writeFile('./data/portfolio.json', jsonStr, 'utf-8')
}



const spreadsheetId = process.argv.slice(-1)[0]
console.log(spreadsheetId)

if (spreadsheetId && spreadsheetId.length > 16) {
    main(spreadsheetId).then(() => {
        console.log("Done")
    })
} else {
    throw new Error("Please pass in a spreadsheet id")
}
