// pose-gen-ctrl.js


module.exports.getGenPage = (req, res) => {
    //res.sendFile(path.join(__dirname, "../views", "pose-gen.html"));
    res.render("pose-gen");
};