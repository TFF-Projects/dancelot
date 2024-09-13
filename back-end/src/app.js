"use strict";

const express = require("express");
const path = require("path");
const cors = require("cors");
const port = process.env.PORT || 4000;

const posegen = require("./routes/pose-gen-router");
const download = require("./routes/download-src-router");

const app = express();


app.use(cors());
app.use(express.json());
app.use('/models', express.static(path.join(__dirname, 'src', 'models')));

app.use(posegen);
app.use(download);

app.use(express.static(path.join(__dirname, '../..', '/front-end/out')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../..',  '/front-end/out/index.html'));
  });

app.listen(port, () => {
    console.log("listening on http://localhost:4000");
});

