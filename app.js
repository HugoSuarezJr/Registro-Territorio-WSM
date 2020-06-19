const express = require('express')
const cors = require("cors");
const index = require('./routes');
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


mongoose
    .connect('mongodb://localhost/NoTocarWebApp', { UseNewUrlParser: true })
    .then((x) => {
        console.log(
            `Hey Hugo, Connected to Mongo! Database name: "${x.connections[0].name}" H.S.`
        )
    })
    .catch((err) => {
        console.error("Hey Hugo Error connecting to mongo H.S", err)
    })

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}))

app.use(cors())

app.use("/", index);

app.listen(process.env.PORT || 5000)