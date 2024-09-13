"use strict";

const express = require("express");
const path = require("path");
const cors = require("cors");
const port = process.env.PORT || 3000;
const app = express();

const home = require("./routes/home-router");
const posegen = require("./routes/pose-gen-router");
const download = require("./routes/download-src-router");
const rtdetect = require("./routes/rt-detect-router");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cors());
app.use(express.json({ limit: "50mb"}));
app.use(express.static(path.join(__dirname, "../public")));
app.use('/models', express.static(path.join(__dirname, 'src', 'models')));

app.use(home);
app.use(posegen);
app.use(download);
app.use(rtdetect);

app.listen(port, () => {
    console.log("listening on http://localhost:3000");
});
