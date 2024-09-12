// rt-detect-router.js

const { Router } = require("express");
const rtdetect = require("../controllers/rt-detect-ctrl")

const router = Router();

router.get("/realtime-detection", rtdetect.getDetectPage);

router.post("/realtime-detection", rtdetect.handleJSON);

module.exports = router;