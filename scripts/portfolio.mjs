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
    const response = await fetch(`https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json&tq&gid=0`)
    const body = ((await response.text())).slice(47,-2)
    const result = JSON.parse(body)
    const headers = getRowVals(result.table.rows.shift())
    const rows = result.table.rows.map((row) => {
      return mapRowToHeaders(headers, row)
    })

    const jsonStr = JSON.stringify(rows, null, 4)
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
