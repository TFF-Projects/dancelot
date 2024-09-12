// rt-detect-ctrl.js
const fs = require("fs");
const filePath = "src/models/realtime_landmarks.txt"

module.exports.getDetectPage = (req, res) => {
    res.render("rt-detect");
}

module.exports.handleJSON = (req, res) => {
    const data = req.body;
    const formattedData = JSON.stringify(data) + '\n';

    fs.appendFile(filePath, formattedData, (err) => {
        if (err) {
            console.error('Error writing to file', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    })
}
