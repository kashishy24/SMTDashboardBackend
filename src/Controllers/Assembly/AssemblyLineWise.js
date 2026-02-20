const express = require("express");
const router = express.Router();
const { sql } = require("../../database/db");
const middlewares = require("../../middlewares/middlewares"); // ✅ ensure imported

//Circular Charts
router.get("/assemblyLineWise-oee-apq", async (req, res) => {
  try {
    const {
      lineID,
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

    if (!lineID) {
      return res.status(400).json({
        message: "lineID is required",
      });
    }

    const request = new sql.Request();

    request.input("LineID", sql.Int, Number(lineID));
    request.input("FilterType", sql.VarChar(20), filterType);
    request.input("Shift", sql.Char(1), shift);
    request.input("StartDate", sql.Date, startDate);
    request.input("EndDate", sql.Date, endDate);

    const result = await request.execute(
      "SP_Dashboard_Assembly_LineLevel_OEEAPQ_ACTPLDTGB"
    );

    res.json(result.recordset);
  } catch (err) {
    console.error(
      "Error in GET SP_Dashboard_Assembly_LineLevel_OEEAPQ_ACTPLDTGB",
      err
    );
    res.status(500).json({ message: "Server error" });
  }
});

//TREND
router.get("/assemblyLineWise-oee-apq_Trend", async (req, res) => {
  try {
    const {
      lineID,
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

    if (!lineID) {
      return res.status(400).json({
        message: "lineID is required",
      });
    }

    const request = new sql.Request();

    request.input("LineID", sql.Int, Number(lineID));
    request.input("FilterType", sql.VarChar(20), filterType);
    request.input("Shift", sql.Char(1), shift);
    request.input("StartDate", sql.Date, startDate);
    request.input("EndDate", sql.Date, endDate);

    const result = await request.execute(
      "SP_AssemblyLineWise_Hourly_APQ_OEE"
    );

    res.json(result.recordset);
  } catch (err) {
    console.error(
      "Error in GET SP_AssemblyLineWise_Hourly_APQ_OEE",
      err
    );
    res.status(500).json({ message: "Server error" });
  }
});

//4M Losses 

// ✅ SMT Line Wise 4M Loss Analysis
router.get("/AssemblyLineWise4MLoss", async (req, res) => {
  try {
    const { LineID, FilterType, Shift, StartDate, EndDate } = req.query;

    if (!FilterType) {
      return middlewares.standardResponse(
        res,
        null,
        400,
        "FilterType is required"
      );
    }

    const sqlRequest = new sql.Request();

    // Optional LineID
    sqlRequest.input("LineID", sql.Int, LineID || null);

    sqlRequest.input("FilterType", sql.VarChar(20), FilterType);
    sqlRequest.input("Shift", sql.Char(1), Shift || null);
    sqlRequest.input("StartDate", sql.Date, StartDate || null);
    sqlRequest.input("EndDate", sql.Date, EndDate || null);

    const result = await sqlRequest.execute(
      "SP_AssemblyLineWise_4MLoss_Analysis"
    );

    middlewares.standardResponse(
      res,
      result.recordset,
      200,
      "success"
    );

  } catch (err) {
    console.error("SP_AssemblyLineWise_4MLoss_Analysis error:", err);

    middlewares.standardResponse(
      res,
      null,
      500,
      "Error fetching 4M Loss Analysis data"
    );
  }
});

// ✅ SMT Line Wise TPM Loss Analysis
router.get("/AssemblyLineWiseTPMLoss", async (req, res) => {
  try {
    const { LineID, FilterType, Shift, StartDate, EndDate } = req.query;

    if (!FilterType) {
      return middlewares.standardResponse(
        res,
        null,
        400,
        "FilterType is required"
      );
    }

    const sqlRequest = new sql.Request();

    // Optional LineID
    sqlRequest.input("LineID", sql.Int, LineID || null);

    sqlRequest.input("FilterType", sql.VarChar(20), FilterType);
    sqlRequest.input("Shift", sql.Char(1), Shift || null);
    sqlRequest.input("StartDate", sql.Date, StartDate || null);
    sqlRequest.input("EndDate", sql.Date, EndDate || null);

    const result = await sqlRequest.execute(
      "SP_AssemblyLineWise_TPMLoss_Analysis"
    );

    middlewares.standardResponse(
      res,
      result.recordset,
      200,
      "success"
    );

  } catch (err) {
    console.error("SP_AssemblyLineWise_TPMLoss_Analysis error:", err);

    middlewares.standardResponse(
      res,
      null,
      500,
      "Error fetching TPM Loss Analysis data"
    );
  }
});


// ✅ SMT Line Wise PlanVsActual
router.get("/AssemblyLineWisePlanVsActual", async (req, res) => {
  try {
    const { LineID, FilterType, Shift, StartDate, EndDate } = req.query;

    if (!FilterType) {
      return middlewares.standardResponse(
        res,
        null,
        400,
        "FilterType is required"
      );
    }

    const sqlRequest = new sql.Request();

    // Optional LineID
    sqlRequest.input("LineID", sql.Int, LineID || null);

    sqlRequest.input("FilterType", sql.VarChar(20), FilterType);
    sqlRequest.input("Shift", sql.Char(1), Shift || null);
    sqlRequest.input("StartDate", sql.Date, StartDate || null);
    sqlRequest.input("EndDate", sql.Date, EndDate || null);

    const result = await sqlRequest.execute(
      "SP_AssemblyLineWise_Hourly_PlanVsActual_01"
    );

    middlewares.standardResponse(
      res,
      result.recordset,
      200,
      "success"
    );

  } catch (err) {
    console.error("SP_AssemblyLineWise_Hourly_PlanVsActual_01 error:", err);

    middlewares.standardResponse(
      res,
      null,
      500,
      "Error fetching TPM Loss Analysis data"
    );
  }
});

//

router.get("/AssemblyLineWiseGoodVsRejection1", async (req, res) => {
  try {
    const { LineID, FilterType, Shift, StartDate, EndDate } = req.query;

    // Required validation
    if (!LineID || !FilterType) {
      return middlewares.standardResponse(
        res,
        null,
        400,
        "LineID and FilterType are required"
      );
    }

    const sqlRequest = new sql.Request();

    sqlRequest.input("LineID", sql.Int, LineID);
    sqlRequest.input("FilterType", sql.VarChar(20), FilterType);
    sqlRequest.input("Shift", sql.Char(1), Shift || null);
    sqlRequest.input("StartDate", sql.Date, StartDate || null);
    sqlRequest.input("EndDate", sql.Date, EndDate || null);

    const result = await sqlRequest.execute(
      "SP_AssemblyLineWise_Hourly_Good_Rejection_01"
    );

    middlewares.standardResponse(
      res,
      result.recordset,
      200,
      "success"
    );

  } catch (err) {
    console.error("SP_AssemblyLineWise_Hourly_Good_Rejection_01:", err);

    middlewares.standardResponse(
      res,
      null,
      500,
      "Error fetching Good vs Rejection data"
    );
  }
});

//Rejected Reason Count

router.get("/AssemblyLineWiseRejectionReasonCount", async (req, res) => {
  try {
    const { LineID, FilterType, Shift, StartDate, EndDate } = req.query;

    // Required validation
    if (!LineID || !FilterType) {
      return middlewares.standardResponse(
        res,
        null,
        400,
        "LineID and FilterType are required"
      );
    }

    const sqlRequest = new sql.Request();

    sqlRequest.input("LineID", sql.Int, LineID);
    sqlRequest.input("FilterType", sql.VarChar(20), FilterType);
    sqlRequest.input("Shift", sql.Char(1), Shift || null);
    sqlRequest.input("StartDate", sql.Date, StartDate || null);
    sqlRequest.input("EndDate", sql.Date, EndDate || null);

    const result = await sqlRequest.execute(
      "sp_Assembly_Get_RejectionReason_Count01"
    );

    middlewares.standardResponse(
      res,
      result.recordset,
      200,
      "success"
    );

  } catch (err) {
    console.error("sp_Assembly_Get_RejectionReason_Count01:", err);

    middlewares.standardResponse(
      res,
      null,
      500,
      "Error fetching  Rejection data"
    );
  }
});
module.exports = router;
