const express = require("express");
const router = express.Router();
const { sql } = require("../../database/db");
const middlewares = require("../../middlewares/middlewares");

// ✅ Get Lines (ShopID = 1 fixed)
router.get("/GetLines", async (req, res) => {
  try {
    const sqlRequest = new sql.Request();

    const result = await sqlRequest.query(`
      SELECT LineName, LineID, ShopID
      FROM [PPMSSMT].[dbo].[Config_Line]
      WHERE ShopID = 1
    `);

    middlewares.standardResponse(res, result.recordset, 200, "success");
  } catch (err) {
    console.error("GetLines error:", err);

    middlewares.standardResponse(res, null, 500, "Error fetching lines");
  }
});

// ✅ Line Level OEE Dashboard API
router.get("/LineLevelOEE", async (req, res) => {
  try {
    const { LineID, FilterType, Shift, StartDate, EndDate } = req.query;

    if (!LineID || !FilterType) {
      return middlewares.standardResponse(
        res,
        null,
        400,
        "LineID and FilterType are required",
      );
    }

    const sqlRequest = new sql.Request();

    sqlRequest.input("LineID", sql.Int, LineID);
    sqlRequest.input("FilterType", sql.VarChar(20), FilterType);
    sqlRequest.input("Shift", sql.Char(1), Shift || null);
    sqlRequest.input("StartDate", sql.Date, StartDate || null);
    sqlRequest.input("EndDate", sql.Date, EndDate || null);

    const result = await sqlRequest.execute(
      "SP_Dashboard_LineLevel_SMT_OEEAPQ_ACTPLDTGB",
    );

    middlewares.standardResponse(res, result.recordset, 200, "success");
  } catch (err) {
    console.error("LineLevelOEE error:", err);

    middlewares.standardResponse(
      res,
      null,
      500,
      "Error fetching line level OEE data",
    );
  }
});

// ✅ SMT Line Wise Hourly APQ OEE
router.get("/SMTLineWiseHourlyOEE", async (req, res) => {
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
      "SP_SMTLineWise_Hourly_APQ_OEE"
    );

    middlewares.standardResponse(
      res,
      result.recordset,
      200,
      "success"
    );

  } catch (err) {
    console.error("SMTLineWiseHourlyOEE error:", err);

    middlewares.standardResponse(
      res,
      null,
      500,
      "Error fetching SMT line wise OEE data"
    );
  }
});

// ✅ SMT Line Wise 4M Loss Analysis
router.get("/SMTLineWise4MLoss", async (req, res) => {
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
      "SP_SMTLineWise_4MLoss_Analysis"
    );

    middlewares.standardResponse(
      res,
      result.recordset,
      200,
      "success"
    );

  } catch (err) {
    console.error("SMTLineWise4MLoss error:", err);

    middlewares.standardResponse(
      res,
      null,
      500,
      "Error fetching 4M Loss Analysis data"
    );
  }
});

// ✅ SMT Line Wise TPM Loss Analysis
router.get("/SMTLineWiseTPMLoss", async (req, res) => {
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
      "SP_SMTLineWise_TPMLoss_Analysis"
    );

    middlewares.standardResponse(
      res,
      result.recordset,
      200,
      "success"
    );

  } catch (err) {
    console.error("SP_SMTLineWise_TPMLoss_Analysis error:", err);

    middlewares.standardResponse(
      res,
      null,
      500,
      "Error fetching TPM Loss Analysis data"
    );
  }
});

// ✅ SMT Line Hourly Plan vs Actual
router.get("/SMTLinePlanVsActual", async (req, res) => {
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
      "SP_SMTLine_Hourly_PlanVsActual"
    );

    middlewares.standardResponse(
      res,
      result.recordset,
      200,
      "success"
    );

  } catch (err) {
    console.error("SMTLinePlanVsActual error:", err);

    middlewares.standardResponse(
      res,
      null,
      500,
      "Error fetching Plan vs Actual data"
    );
  }
});

// ✅ SMT Line Hourly Good vs Rejection
router.get("/SMTLineGoodVsRejection", async (req, res) => {
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
      "SP_SMTLine_Hourly_GoodVsRejection"
    );

    middlewares.standardResponse(
      res,
      result.recordset,
      200,
      "success"
    );

  } catch (err) {
    console.error("SMTLineGoodVsRejection error:", err);

    middlewares.standardResponse(
      res,
      null,
      500,
      "Error fetching Good vs Rejection data"
    );
  }
});

// SMT Line Rejection Reason Count API
router.get("/SMTLineRejectionReason", async (req, res) => {
  try {
    const {
      LineID,
      FilterType,
      ProdDate,
      Shift,
      StartDate,
      EndDate,
    } = req.query;

    // Validation
    if (!LineID || !FilterType) {
      return middlewares.standardResponse(
        res,
        null,
        300,
        "LineID and FilterType are required"
      );
    }

    const sqlRequest = new sql.Request();

    sqlRequest.input("LineID", sql.Int, LineID);
    sqlRequest.input("FilterType", sql.VarChar(20), FilterType);
    sqlRequest.input("ProdDate", sql.Date, ProdDate || null);
    sqlRequest.input("Shift", sql.Char(1), Shift || null);
    sqlRequest.input("StartDate", sql.Date, StartDate || null);
    sqlRequest.input("EndDate", sql.Date, EndDate || null);

    const result = await sqlRequest.execute(
      "sp_SMTLine_Get_RejectionReason_Count"
    );

    const data = result.recordset;

    middlewares.standardResponse(res, data, 200, "success");
  } catch (err) {
    console.error("SMT Line Rejection Reason error:", err);
    middlewares.standardResponse(
      res,
      null,
      300,
      "Error fetching rejection reason data"
    );
  }
});

// Line Wise SMT OEE Dashboard API
router.get("/SMTLineStationWiseOEE", async (req, res) => {
  try {
    const {
      LineID,
      FilterType,
      Shift,
      StartDate,
      EndDate,
    } = req.query;

    // Basic Validation
    if (!LineID || !FilterType) {
      return middlewares.standardResponse(
        res,
        null,
        300,
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
      "SP_Dashboard_LineStationWise_SMT_OEEAPQ"
    );

    const data = result.recordset;

    middlewares.standardResponse(res, data, 200, "success");

  } catch (err) {
    console.error("SMT Line OLE error:", err);
    middlewares.standardResponse(
      res,
      null,
      300,
      "Error fetching SMT Line OLE data"
    );
  }
});

module.exports = router;
