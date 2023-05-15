#!/usr/bin/env node

const getRowVals = (row) => row.c.map(r => r && r.v ? r.v : '')

const mapRowToHeaders = (headers, row) => {
    const values = getRowVals(row)
    const result = {}
    headers.forEach((header, idx) => {
        result[header] = values[idx]
    });
    return result
}

const main = async (id) => {
    const response = await fetch(`https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json&tq&gid=0`)
    const body = ((await response.text())).slice(47,-2)
    return JSON.parse(body)
}

const spreadsheetId = process.argv.slice(-1)

main(spreadsheetId).then((result) => {
  const headers = getRowVals(result.table.rows.shift())
  const rows = result.table.rows.map((row) => {
    return mapRowToHeaders(headers, row)
  })
  console.log(JSON.stringify(rows, null, 4))
})