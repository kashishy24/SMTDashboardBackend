const express = require("express");
const router = express.Router();
const { sql } = require("../../database/db");
const middlewares = require("../../middlewares/middlewares"); // ✅ ensure imported


router.get("/assemblyLineWise-group-oee-apq", async (req, res) => {
  try {
    const {
      groupNo,
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

    if (!groupNo) {
      return res.status(400).json({
        message: "groupNo is required",
      });
    }

    const request = new sql.Request();

    request.input("GroupNo", sql.Int, Number(groupNo));
    request.input("FilterType", sql.VarChar(20), filterType);
    request.input("Shift", sql.Char(1), shift);
    request.input("StartDate", sql.Date, startDate);
    request.input("EndDate", sql.Date, endDate);

    const result = await request.execute("SP_Dashboard_Assembly_Group_LineLevel_OEEAPQ_ACTPLDTGB");

    res.json(result.recordset);
  } catch (err) {
    console.error("Error in GET SP_Dashboard_Assembly_Group_LineLevel_OEEAPQ_ACTPLDTGB", err);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
