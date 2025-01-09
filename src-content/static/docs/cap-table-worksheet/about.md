---
title: About the Captable Worksheet
weight: 1
prev: /docs/founders-handbook/cap-table-worksheet
---

At 1984 we believe founders should be able to quickly understand the decisions they make with regards to financing, particularly at the earliest stages when legal support is minimal.  We believe SAFEs in particular should be easy to understand and model, and the tools should be open source, well-tested, and easy for anyone to use. Currently the best we have are either aging Excel spreadsheets that get passed around, or a fairly rudimentary webapp--which is why we created this project. 

The captable worksheet is an open-source, client-side tool to help founders model their SAFE and priced rounds. The module is available on [github](https://github.com/1984vc/startup-finance) and 1984 hosts an instance at [https://1984.vc/docs/cap-table-worksheet](/docs/cap-table-worksheet)

Design Goals:

1. Users can enter their cap table details and understand the dilution from their existing and future financing rounds
2. Users can model the impact of small changes to round size and valuation on their resulting ownership 
3. Users can share this cap table with co-founders and investors easily and securely
4. No data is stored anywhere at 1984, including log files

How it works:

- The captable worksheet stores the entire state encoded in the URL
- All the calculations take place in the browser
- Each iteration of the cap table is also stored in the browser's local storage for easy retrieval
- If users want a permanent copy beyond just saving the URL, they can use the "share by email" option, which sends the cap table details to their email. 1984 will have a record of the email address but not the email content or captable information.

We value all input! If you'd like to report bugs, provide feedback, or suggest improvements, please email [team@1984.vc](mailto:team@1984.vc)
