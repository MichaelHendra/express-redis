const express = require("express");
const pool = require("../config/database");
const redisClient = require("../config/redisClient");
const router = express.Router();

router.get("/", async (req, res) => {
  const cacheKey = "ruangan_m_data";

  try {
    const cacheData = await redisClient.get(cacheKey);

    if (cacheData) {
      console.log("Cache hit");
      return res.json({ data: JSON.parse(cacheData) });
    }
    console.log("Cache miss");
    const result = await pool.query(`SELECT * FROM ruangan_m`);

    await redisClient.setEx(cacheKey, 60, JSON.stringify(result.rows));

    return res.json({ data: result.rows });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
