const express = require("express");
const router = express.Router();

const {
  getLoans,
  addLoan,
} = require("../controllers/loan.controller");

router.get("/", getLoans);
router.post("/", addLoan);

module.exports = router;
