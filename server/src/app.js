import express from "express"
import { pool } from "./db/pool.js";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
    res.json({ok:true});
})

app.get ("/db-check", async(req, res) => {
    try {
        const result = await pool.query("SELECT NOW() as now");
        res.json({ok:true, dbTime: result.rows[0].now});
    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false, error: "DB Connection Failed"});
    }
})

export default app;