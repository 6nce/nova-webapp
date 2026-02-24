import express from "express"
import "dotenv/config"
import { pool } from "./db/pool.js";
import authRoutes from "./routes/auth.routes.js";
import bcrypt from "bcrypt";
import error from "jsonwebtoken/lib/JsonWebTokenError.js";
const app = express();

const fieldRegex = /^[a-zA-Z0-9_]+$/;

app.use(express.json());
app.use("/auth", authRoutes);

app.get("/health", (req, res) => {
    res.json({ok:true});
})
app.get("/health/db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW() as now");
        return res.json({ ok: true, dbTime: result.rows[0].now });
    } catch (error) {
        console.error("DB CHECK ERROR FULL:", error);
        return res.status(500).json({
            ok: false,
            message: error?.message,
            code: error?.code,
            name: error?.name,
        });
    }
});

//endpoint for supabase connection testing
app.get("/db-whoami", async (req, res) => {
    try {
        const q = `select
            current_database() as db,
            inet_server_addr() as server_ip,
            inet_server_port() as server_port,
            version() as version;`;
        const result = await pool.query(q);
        res.json({ ok: true, ...result.rows[0] });
    } catch (error) {
        console.error("DB WHOAMI ERROR:", error);
        res.status(500).json({ ok: false, message: error.message });
    }
});


app.get("/health/env", (req, res) => {
    res.json({
        ok:true,
        DATABASE_URL: Boolean(process.env.DATABASE_URL),
    })
})



export default app;