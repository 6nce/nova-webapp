import express from "express"
import "dotenv/config"
import { pool } from "./db/pool.js";
import authRoutes from "./routes/auth.routes.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import client from "pg/lib/client";

const app = express();
const router = express.Router();

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

router.post("/signup", async (req, res) => {
    try {
        const {email, password, firstName, lastName, userName} = req.body;
        if (!email || !password || !firstName || !lastName || !userName) {
            return res.status(400).json({ok:false, error: "Missing Fields"});
        }
        if (password.length < 8) {
            return res.status(400).json({ok: false, error: "Password does not meet length requirements."});
        }
        const scrubbedEmail =  email.trim().toLowerCase();
        const hashPassword = await bcrypt.hash(password, 12);

        const dupeCheckQueryString = ' SELECT id FROM users WHERE email = $1';
        const dupeCheckQuery = await pool.query(dupeCheckQueryString, [scrubbedEmail]);
        if (dupeCheckQuery.rowCount > 0) {
            return res.status(409).json({ok:false, error: "An account already exists with this email."});
        }

        const insertUserQueryString = ' INSERT INTO users (email, credential_hash) VALUES ($1, $2) RETURNING id, email, created_at';
        const insertUserQuery = await pool.query(insertUserQueryString, [scrubbedEmail, hashPassword]);
        const userId = insertUserQuery.rows[0].id;

        const insertProfileQueryString = 'INSERT INTO profiles (user_id, username, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING username, created_at';
        const insertProfileQuery = await pool.query(insertProfileQueryString, [userId, userName, firstName, lastName]);

        return res.status(200).json({ok: true, user: insertUserQuery, profile: insertProfileQuery});

    } catch(error){
        console.error("DB WHOAMI ERROR:", error);
        res.status(500).json({ok:false, error:error.message});
    }
})

export default app;