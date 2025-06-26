const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const redisClient = require("./config/redisClient");
const pool = require('./config/database');
const cron = require('node-cron')
const port = process.env.NODE_API_PORT || 5000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());

const homeRoute = require("./routes/home");
app.use("/api/home", homeRoute);
const cacheKey = "datapoli30day_data";


//cache data ruangan_m_data
cron.schedule('*/5 * * * *', async () => {
    try {
        const result = await pool.query(`SELECT * FROM ruangan_m`);
        await redisClient.set(cacheKey, JSON.stringify(result.rows));
        console.log("Cached ruangan_m_data successfully");
    } catch (err) {
        console.error("Cron job error:", err);
    }
}, {
    timezone: "Asia/Jakarta"
});


app.listen(port, () => {
    console.log(`Server is Running ${port}`);
});

