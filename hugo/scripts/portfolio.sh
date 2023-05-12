#!/bin/bash

curl -X GET -H "Authorization: Token $BASEROW_API_KEY" "https://api.baserow.io/api/database/rows/table/164534/?user_field_names=true" \
    > data/portfolio.json

# Example GOOGLE SHEET URL
https://docs.google.com/spreadsheets/d/__ID__/gviz/tq?tqx=out:json&tq&gid=0