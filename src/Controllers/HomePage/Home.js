const express = require("express");
const router = express.Router();
const { sql } = require("../../database/db");
const middlewares = require("../../middlewares/middlewares"); // ✅ ensure imported

//Plant level SMT OEE APQ Circle
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
//Plant level Assembly OEE APQ Circle
router.get("/plant-assembly-oee", async (req, res) => {
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
      "SP_Dashboard_PlantLevel_Assembly_OEE"
    );

    res.json(result.recordset);
  } catch (err) {
    console.error("Error in GET /plant-assembly-oee", err);
    res.status(500).json({ message: "Server error" });
  }
});


//Plant level SMT OEE APQ Trend
router.get("/plant-smtLine-apq-oee-trend", async (req, res) => {
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

    const result = await request.execute("sp_PlantLevel_APQOEE_Trend");

    res.json(result.recordset);
  } catch (err) {
    console.error("Error in GET /plant-apq-oee-trend", err);
    res.status(500).json({ message: "Server error" });
  }
});

//Plant level Assembly OEE APQ Trend
router.get("/plant-assemblyLine-apq-oee-trend", async (req, res) => {
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

    const result = await request.execute("sp_PlantLevel_Assembly_APQOEE_Trend");

    res.json(result.recordset);
  } catch (err) {
    console.error("Error in GET /plant-assembly-apq-oee-trend", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/LineWise-apq-ole", async (req, res) => {
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

    const result = await request.execute("SP_Dashboard_LineWise_SMT_OLE");

    res.json(result.recordset);
  } catch (err) {
    console.error("Error in GET SP_Dashboard_LineWise_SMT_OLE", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
