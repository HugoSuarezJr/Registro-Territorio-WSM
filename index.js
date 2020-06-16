const express = require('express')
const cors = require("cors");
const app = require('./routes/app');
const index = express()

app.use(cors())

index.use("/", app);

index.listen(process.env.PORT || 5000)