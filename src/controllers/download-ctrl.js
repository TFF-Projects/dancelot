const ytdl = require("@distube/ytdl-core");
const fs = require("fs");

module.exports.getDownload = (req, res) => {
    var URL = req.query.URL;
    res.send(`Downloaded ${URL}!`);
    
    ytdl(URL, {
        format: "mp4"
    }).pipe(fs.createWriteStream("src/models/videos/video.mp4"));
};