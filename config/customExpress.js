const express = require("express")
const axios = require("axios")
const consign = require("consign")




module.exports = () =>{

const app = express();
app.use(express.json())
consign()
    .include("controllers")
    .into(app)

    return app
}
