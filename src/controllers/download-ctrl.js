const ytdl = require("ytdl-core");

module.exports.getDownload = (req, res) => {
    var URL = req.query.URL;
    res.json({url:URL});
    
    res.header("Content-Disposition", "attachment;filename='video.mp4'");

    ytdl(URL, {
        format: "mp4"
    }).pipe(res);
};