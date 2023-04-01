const express = require('express');
const app = express();
const cors = require("cors")
const port = process.env.PORT || 4000;
app.use(express.json({ limit: '50mb' }))
app.use(cors())
const { connection,AllLinksModel } = require("./db");



app.listen(port, async () => {
    try {
        await connection
        console.log("Connected to db")
    } catch (err) {
        console.log(err)
    }
    console.log("Server Started at PORT", port)
})