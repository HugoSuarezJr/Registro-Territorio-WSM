const express = require('express')
const cors = require("cors");
const index = require('./routes');
const app = express()

app.use(cors())

app.use("/", index);

app.listen(process.env.PORT || 5000)