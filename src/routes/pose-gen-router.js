// pose-gen-router.js

const { Router } = require("express");
const posegen = require("../controllers/pose-gen-ctrl")

const router = Router();

router.get("/pose-sequence-generation", posegen.getGenPage);

module.exports = router;