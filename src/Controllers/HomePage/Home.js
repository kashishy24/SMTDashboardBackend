const express = require("express");
const router = express.Router();
const { sql } = require("../../database/db");
const middlewares = require("../../middlewares/middlewares"); // ✅ ensure imported

router.get("/plant-smt-oee", async (req, res) => {
  try {
    const {
      filterType,
      shift = null,
      startDate = null,
      endDate = null,
    } = req.query;

    if (!filterType) {
      return res.status(400).json({
        message: "filterType is required",
      });
    }

    const request = new sql.Request();

    request.input("FilterType", sql.VarChar(20), filterType);
    request.input("Shift", sql.Char(1), shift);
    request.input("StartDate", sql.Date, startDate);
    request.input("EndDate", sql.Date, endDate);

    const result = await request.execute(
      "SP_Dashboard_PlantLevel_SMT_OEE_2"
    );

    res.json(result.recordset);
  } catch (err) {
    console.error("Error in GET /plant-smt-oee", err);
    res.status(500).json({ message: "Server error" });
  }
});







module.exports = router;
