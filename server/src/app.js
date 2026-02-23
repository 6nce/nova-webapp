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

//Registration
app.post("/signup", async (req, res) => {
    try {

        //Receiving JSON
        const { email, password, firstName, lastName, userName } = req.body;

        //Missing Fields
        if (!email || !password || !firstName || !lastName || !userName) {
            return res.status(400).json({ok:false, error: "Please fill out all fields."});
        }

        //Sanitizing fields
        const formEmail = email.trim().toLowerCase();
        const formFirstName = firstName.trim().toLowerCase();
        const formLastName = lastName.trim().toLowerCase();
        const formUserName = userName.trim().toLowerCase();
        const formPassword = password.trim();
        const hashPassword = await bcrypt.hash(formPassword, 12);
        const reserved = ["admin", "root", "support", "nova"];

        //Annoying Name Check
        if (
            reserved.includes(formFirstName) ||
            reserved.includes(formLastName) ||
            reserved.includes(formUserName) ||
            !fieldRegex.test(formFirstName) ||
            !fieldRegex.test(formLastName) ||
            !fieldRegex.test(formUserName)) {
            return res.status(400).json({ ok: false, error: "Name not allowed." });
        }


        //Requirements Check
        if (formPassword.length < 8) {
            return res.status(400).json({ok: false, error: "Password does not meet length requirements."});
        }
        if (formUserName.length < 3 || formUserName.length > 30 ) {
            return res.status(400).json({ ok: false, error: "Username does not meet requirements." });
        }

        //Pre-exist checks
        const emailDupeCheckQueryString = ' SELECT id FROM users WHERE email = $1';
        const emailDupeCheckQuery = await pool.query(emailDupeCheckQueryString, [formEmail]);
        if (emailDupeCheckQuery.rowCount > 0) {
            return res.status(409).json({ ok:false, error: "An account already exists with this email." });
        }

        const userNameDupeCheckQueryString = ' SELECT user_id FROM profiles WHERE username = $1';
        const userNameDupeCheckQuery = await pool.query(userNameDupeCheckQueryString, [formUserName]);
        if (userNameDupeCheckQuery.rowCount > 0) {
            return res.status(409).json({ok:false, error: "Username not available."});
        }


        const insertUserQueryString = ' INSERT INTO users (email, credential_hash) VALUES ($1, $2) RETURNING id, email, created_at';
        const insertUserQuery = await pool.query(insertUserQueryString, [formEmail, hashPassword]);
        const userId = insertUserQuery.rows[0].id;

        const insertProfileQueryString = 'INSERT INTO profiles (user_id, username, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING username, created_at';
        const insertProfileQuery = await pool.query(insertProfileQueryString, [userId, formUserName, formFirstName, formLastName]);

        return res.status(201).json({ok: true, user: insertUserQuery.rows[0], profile: insertProfileQuery.rows[0]});

    } catch(error){
        console.error("REGISTRATION ERROR:", error);
        res.status(500).json({ok:false, error:"Internal Server Error"});
    }
})

export default app;