// home-router.js

const { Router } = require("express");
const app = Router();

app.get("/", (req, res) => {
    res.send("Dancelot");
});

module.exports = app;