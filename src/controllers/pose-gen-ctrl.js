// pose-gen-ctrl.js

const path = require("path");

module.exports.getGenPage = (req, res) => {
    //res.sendFile(path.join(__dirname, "../views", "pose-gen.html"));
    res.render("pose-gen");
};