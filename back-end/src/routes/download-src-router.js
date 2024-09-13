const { Router } = require("express");
const download = require("../controllers/download-ctrl")

const router = Router();

router.get("/download", download.getDownload);

module.exports = router;