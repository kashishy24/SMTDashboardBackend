const express = require("express");
const router = express.Router();
const { sql } = require("../../database/db");
const middlewares = require("../../middlewares/middlewares"); // ✅ ensure imported

// Dashboard Summary API
router.get("/TrolleyLiveStatus", async (req, res) => {
  try {
    const sqlRequest = new sql.Request(); // ✅ renamed

    const result = await sqlRequest.execute(
      "SP_Dashboard_TrolleyLiveStatus"
    );

    const data = {
      locationStatus: result.recordsets[0][0],
      breakdown: result.recordsets[1][0],
      repairedToday: result.recordsets[2][0]?.RepairedToday ?? 0,
      pmCompletedToday: result.recordsets[3][0]?.PMCompletedToday ?? 0,
    };

    middlewares.standardResponse(res, data, 200, "success");
  } catch (err) {
    console.error("Dashboard summary error:", err);
    middlewares.standardResponse(
      res,
      null,
      300,
      "Error fetching dashboard summary"
    );
  }
});






module.exports = router;
