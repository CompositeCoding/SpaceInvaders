const express = require('express')
var path = require('path');
const app = express()
const port = 8000

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/index.html'));
  })


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })