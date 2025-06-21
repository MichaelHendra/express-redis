const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const port = process.env.NODE_API_PORT || 5000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());

const homeRoute = require("./routes/home");
app.use("/api/home", homeRoute)

app.listen(port, () => {
    console.log(`Server is Running ${port}`);
});

