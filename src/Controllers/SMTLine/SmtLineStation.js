const express = require("express");
const router = express.Router();
const { sql } = require("../../database/db");
const middlewares = require("../../middlewares/middlewares");

// Station Level SMT OEE Dashboard API
router.get("/SMTStationLevelOEE", async (req, res) => {
  try {
    const {
      LineID,
      StationID,
      FilterType,
      Shift,
      StartDate,
      EndDate,
    } = req.query;

    // Basic validation
    if (!LineID || !StationID || !FilterType) {
      return middlewares.standardResponse(
        res,
        null,
        300,
        "LineID, StationID and FilterType are required"
      );
    }

    const sqlRequest = new sql.Request();

    sqlRequest.input("LineID", sql.Int, LineID);
    sqlRequest.input("StationID", sql.Int, StationID || null);
    sqlRequest.input("FilterType", sql.VarChar(20), FilterType);
    sqlRequest.input("Shift", sql.Char(1), Shift || null);
    sqlRequest.input("StartDate", sql.Date, StartDate || null);
    sqlRequest.input("EndDate", sql.Date, EndDate || null);

    const result = await sqlRequest.execute(
      "SP_Dashboard_StationLevel_SMT_OEEAPQ_ACTPLDTGB"
    );

    const data = result.recordset;

    middlewares.standardResponse(res, data, 200, "success");

  } catch (err) {
    console.error("SMT Station Level OEE error:", err);
    middlewares.standardResponse(
      res,
      null,
      300,
      "Error fetching Station Level OEE data"
    );
  }
});

// SMT Station Wise Hourly APQ OEE API
router.get("/SMTStationHourlyAPQOEE", async (req, res) => {
  try {
    const {
      LineID,
      StationID,
      FilterType,
      Shift
    } = req.query;

    // Validation
    if (!LineID || !StationID || !FilterType) {
      return middlewares.standardResponse(
        res,
        null,
        300,
        "LineID, StationID and FilterType are required"
      );
    }

    const sqlRequest = new sql.Request();

    sqlRequest.input("LineID", sql.Int, LineID);
    sqlRequest.input("StationID", sql.Int, StationID || null);
    sqlRequest.input("FilterType", sql.VarChar(20), FilterType);
    sqlRequest.input("Shift", sql.Char(1), Shift || null);

    const result = await sqlRequest.execute(
      "SP_SMTStationWise_Hourly_APQ_OEE"
    );

    middlewares.standardResponse(
      res,
      result.recordset,
      200,
      "success"
    );

  } catch (err) {
    console.error("SMT Station Hourly APQ OEE error:", err);
    middlewares.standardResponse(
      res,
      null,
      300,
      "Error fetching Station Hourly APQ OEE data"
    );
  }
});

// SMT Station Wise 4M Loss Analysis API
router.get("/SMTStation4MLoss", async (req, res) => {
  try {
    const {
      LineID,
      StationID,
      FilterType,
      Shift,
      StartDate,
      EndDate
    } = req.query;

    // Validation
    if (!FilterType) {
      return middlewares.standardResponse(
        res,
        null,
        300,
        "FilterType is required"
      );
    }

    const sqlRequest = new sql.Request();

    sqlRequest.input("LineID", sql.Int, LineID || null);
    sqlRequest.input("StationID", sql.Int, StationID || null);
    sqlRequest.input("FilterType", sql.VarChar(20), FilterType);
    sqlRequest.input("Shift", sql.Char(1), Shift || null);
    sqlRequest.input("StartDate", sql.Date, StartDate || null);
    sqlRequest.input("EndDate", sql.Date, EndDate || null);

    const result = await sqlRequest.execute(
      "SP_SMTStationWise_4MLoss_Analysis"
    );

    middlewares.standardResponse(
      res,
      result.recordset,
      200,
      "success"
    );

  } catch (err) {
    console.error("SMT 4M Loss Analysis error:", err);
    middlewares.standardResponse(
      res,
      null,
      300,
      "Error fetching 4M Loss Analysis data"
    );
  }
});

// SMT Station Wise TPM Loss Analysis
router.post("/SMTStationTPMLossAnalysis", async (req, res) => {
  try {
    const {
      LineID = null,
      StationID = null,
      FilterType,
      Shift = null,
      StartDate = null,
      EndDate = null,
    } = req.body;

    if (!FilterType) {
      return middlewares.standardResponse(
        res,
        null,
        400,
        "FilterType is required"
      );
    }

    const sqlRequest = new sql.Request();

    sqlRequest.input("LineID", sql.Int, LineID);
    sqlRequest.input("StationID", sql.Int, StationID);
    sqlRequest.input("FilterType", sql.VarChar(20), FilterType);
    sqlRequest.input("Shift", sql.Char(1), Shift);
    sqlRequest.input("StartDate", sql.Date, StartDate);
    sqlRequest.input("EndDate", sql.Date, EndDate);

    const result = await sqlRequest.execute(
      "SP_SMTStationWise_TPMLoss_Analysis"
    );

    middlewares.standardResponse(
      res,
      result.recordset,
      200,
      "success"
    );
  } catch (err) {
    console.error("SMTStationWiseTPMLossAnalysis error:", err);
    middlewares.standardResponse(
      res,
      null,
      500,
      "Error fetching TPM Loss Analysis"
    );
  }
});

// SMT Station - Hourly Good Vs Rejection
router.post("/SMTStationHourlyGoodVsRejection", async (req, res) => {
  try {
    const {
      LineID,
      StationID,
      FilterType,
      Shift = null,
      StartDate = null,
      EndDate = null,
    } = req.body;

    if (!LineID || !StationID || !FilterType) {
      return middlewares.standardResponse(
        res,
        null,
        400,
        "LineID, StationID and FilterType are required"
      );
    }

    const sqlRequest = new sql.Request();

    sqlRequest.input("LineID", sql.Int, LineID);
    sqlRequest.input("StationID", sql.Int, StationID);
    sqlRequest.input("FilterType", sql.VarChar(20), FilterType);
    sqlRequest.input("Shift", sql.Char(1), Shift);
    sqlRequest.input("StartDate", sql.Date, StartDate);
    sqlRequest.input("EndDate", sql.Date, EndDate);

    const result = await sqlRequest.execute(
      "SP_SMTStation_Hourly_GoodVsRejection"
    );

    middlewares.standardResponse(res, result.recordset, 200, "success");
  } catch (err) {
    console.error("GoodVsRejection error:", err);
    middlewares.standardResponse(
      res,
      null,
      500,
      "Error fetching Good Vs Rejection data"
    );
  }
});

// SMT Station - Hourly Plan Vs Actual
router.post("/SMTStationHourlyPlanVsActual", async (req, res) => {
  try {
    const {
      LineID,
      StationID = null,
      FilterType,
      Shift = null,
      StartDate = null,
      EndDate = null,
    } = req.body;

    if (!LineID || !StationID || !FilterType) {
      return middlewares.standardResponse(
        res,
        null,
        400,
        "LineID, StationID and FilterType are required"
      );
    }

    const sqlRequest = new sql.Request();

    sqlRequest.input("LineID", sql.Int, LineID);
    sqlRequest.input("StationID", sql.Int, StationID);
    sqlRequest.input("FilterType", sql.VarChar(20), FilterType);
    sqlRequest.input("Shift", sql.Char(1), Shift);
    sqlRequest.input("StartDate", sql.Date, StartDate);
    sqlRequest.input("EndDate", sql.Date, EndDate);

    const result = await sqlRequest.execute(
      "SP_SMTStation_Hourly_PlanVsActual"
    );

    middlewares.standardResponse(res, result.recordset, 200, "success");
  } catch (err) {
    console.error("PlanVsActual error:", err);
    middlewares.standardResponse(
      res,
      null,
      500,
      "Error fetching Plan Vs Actual data"
    );
  }
});

// SMT Station - Rejection Reason Count
router.post("/SMTStationRejectionReasonCount", async (req, res) => {
  try {
    const {
      LineID,
      StationID,
      FilterType,
      ProdDate = null,
      Shift = null,
      StartDate = null,
      EndDate = null,
    } = req.body;

    if (!LineID || !StationID || !FilterType) {
      return middlewares.standardResponse(
        res,
        null,
        400,
        "LineID, StationID and FilterType are required"
      );
    }

    const sqlRequest = new sql.Request();

    sqlRequest.input("LineID", sql.Int, LineID);
    sqlRequest.input("StationID", sql.Int, StationID);
    sqlRequest.input("FilterType", sql.VarChar(20), FilterType);
    sqlRequest.input("ProdDate", sql.Date, ProdDate);
    sqlRequest.input("Shift", sql.Char(1), Shift);
    sqlRequest.input("StartDate", sql.Date, StartDate);
    sqlRequest.input("EndDate", sql.Date, EndDate);

    const result = await sqlRequest.execute(
      "sp_SMTStation_Get_RejectionReason_Count"
    );

    middlewares.standardResponse(res, result.recordset, 200, "success");
  } catch (err) {
    console.error("RejectionReasonCount error:", err);
    middlewares.standardResponse(
      res,
      null,
      500,
      "Error fetching Rejection Reason Count"
    );
  }
});

module.exports = router; 