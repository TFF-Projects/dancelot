const express = require("express");
const path = require("path");
const cors = require("cors");
const port = 3000;
const app = express();

const home = require("./routes/home-router");
const posegen = require("./routes/pose-gen-router");
const download = require("./routes/download-src-router");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cors())
app.use(home);
app.use(posegen);
app.use(download);

app.listen(port, () => {
    console.log("listening on http://localhost:3000");
});
