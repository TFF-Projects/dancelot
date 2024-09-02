// rt-detect-router.js

const { Router } = require("express");
const rtdetect = require("../controllers/rt-detect-ctrl")

const router = Router();

router.get("/realtime-detection", rtdetect.getDetectPage);

module.exports = router;