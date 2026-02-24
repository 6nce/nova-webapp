import express from "express";
import { z } from "zod";
import { pool } from "../db/pool.js";
import { hashCredential } from "../lib/credentials.js";
import {verifyCredential} from "../lib/credentials.js";
import { signAccessToken } from "../lib/jwt.js";

//Setup
const router = express.Router();
const fieldRegex = /^[a-zA-Z0-9_]+$/;


//Schemas
const registerSchema = z.object({
    //users table
    email: z.string().email(),
    secret: z.string().min(8).max(256),
    //profiles table
    firstName: z.string().max(50),
    lastName: z.string().max(50),
    userName: z.string().min(3).max(30)
});

const loginSchema = z.object({
    //users table
    email: z.string().email(),
    secret: z.string().min(8).max(256),
})


//Registration
router.post("/signup", async (req, res) => {
    //Parses Data
    const parsedRegister = registerSchema.safeParse(req.body);

    //Missing Fields / Invalid Input
    if (!parsedRegister.success) {
        return res.status(400).json({ok:false, error: "Invalid Input"});
    }

    //Converts Parsed JSON Data
    const { email, secret, firstName, lastName, userName } = parsedRegister.data;
    //Sanitizing fields
    const formEmail = email.trim().toLowerCase();
    const formFirstName = firstName.trim().toLowerCase();
    const formLastName = lastName.trim().toLowerCase();
    const formUserName = userName.trim().toLowerCase();
    const formSecret = secret.trim();
    const reserved = [
        "admin",
        "root",
        "support",
        "nova"
    ];

    //Invalid Character Check
    if (
        reserved.includes(formFirstName) ||
        reserved.includes(formLastName) ||
        reserved.includes(formUserName) ||
        !fieldRegex.test(formFirstName) ||
        !fieldRegex.test(formLastName) ||
        !fieldRegex.test(formUserName)) {
        return res.status(400).json({ ok: false, error: "Name not allowed." });
    }

    //Email Dupe Check
    const emailDupeCheckQueryString = ' SELECT id FROM users WHERE email = $1';
    const emailDupeCheckQuery = await pool.query(emailDupeCheckQueryString, [formEmail]);
    if (emailDupeCheckQuery.rowCount > 0) {
        return res.status(409).json({ ok:false, error: "An account already exists with this email." });
    }

    //UserName Dupe Check
    const userNameDupeCheckQueryString = ' SELECT user_id FROM profiles WHERE username = $1';
    const userNameDupeCheckQuery = await pool.query(userNameDupeCheckQueryString, [formUserName]);
    if (userNameDupeCheckQuery.rowCount > 0) {
        return res.status(409).json({ok:false, error: "Username not available."});
    }

    //Insert to Tables
    const client = await pool.connect();
    try {
        //Insert into Users Table
        const hashSecret = await hashCredential(formSecret);
        //Hash before starting transaction
        await client.query("BEGIN");
        const insertUserQueryString =
            `
                INSERT INTO users (email, credential_hash)
                VALUES ($1, $2) RETURNING id, email, created_at
            `;
        const insertUserQuery = await client.query(insertUserQueryString, [formEmail, hashSecret]);
        const userId = insertUserQuery.rows[0].id;
        const insertProfileQueryString =
            `
                INSERT INTO profiles (user_id, username, first_name, last_name)
                VALUES ($1, $2, $3, $4) RETURNING username, created_at
            `;
        const insertProfileQuery = await client.query(insertProfileQueryString, [userId, formUserName, formFirstName, formLastName]);

        await client.query("COMMIT");
        return res.status(201).json({ok: true, user: insertUserQuery.rows[0], profile: insertProfileQuery.rows[0]});
    } catch (error) {
        await client.query("ROLLBACK");
        if(error?.code === '23505') {
            return res.status(409).json({ok:false, error: "Email or Username already exists"});
        }
        console.error("Registration Error:", error);
        return res.status(500).json({ok:false, error:"Internal Server Error"});
    } finally{
        client.release();
    }
})

//Login
router.post("/login", async (req, res) => {

    //Parses Data
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ok:false, error: "Invalid Input"});
    }
    const {email, secret} = parsed.data;
    const formEmail = email.trim().toLowerCase();

    try{
        //Send Query to DB
        const result = await pool.query(
            `
          select
            u.id,
            u.email,
            u.credential_hash,
            p.username,
            p.first_name,
            p.last_name,
            p.avatar_url
          from public.users u
          join public.profiles p on p.user_id = u.id
          where u.email = $1
        `,
            [formEmail]
        );

        //Error Handling
        const sendLoginError = () =>
            res.status(401).json({ ok: false, error: "Invalid Credentials" });

        //User Not Found
        if(result.rowCount === 0) {
            return sendLoginError();
        }

        //User Validation
        const userRow = result.rows[0];
        const valid = await verifyCredential(userRow.credential_hash, secret);
        if (!valid) {
            return sendLoginError();
        }
        const token = signAccessToken(userRow.id);

        return res.json ({
            ok:true,
            token,
            user: {
                id: userRow.id,
                email: userRow.email,
                username: userRow.username,
                firstName: userRow.first_name,
                lastName: userRow.last_name,
                avatarUrl: userRow.avatar_url,
            },
        });
    } catch (err) {
        return res.status(500).json({ok:false, error: err.message});
    }
})



export default router;