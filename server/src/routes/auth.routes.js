import express from "express";
import { z } from "zod";
import { pool } from "../db/pool.js";
import { hashCredential } from "../lib/credentials.js";
import {verifyCredential} from "../lib/credentials.js";
import { signAccessToken } from "../lib/jwt.js";

const router = express.Router();


const registerSchema = z.object({
    email: z.email(),
    secret: z.string().min(8).max(256),
    username: z.string().min(3).max(30),

    firstName: z.string().max(50).optional(),
    lastName: z.string().max(50).optional(),
    avatarUrl: z.string().url().optional(),
});

const loginSchema = z.object({
    email: z.email(),
    secret: z.string().min(8).max(256),
})


router.post("/register", async (req, res) => {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ ok: false, error: "Invalid input", details: parsed.error.flatten() });
    }

    const { email, secret, username, firstName, lastName, avatarUrl } = parsed.data;

    const credentialHash = await hashCredential(secret);

    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        const userResult = await client.query(
            `insert into public.users (email, credential_hash)
       values ($1, $2)
       returning id, email`,
            [email, credentialHash]
        );

        const user = userResult.rows[0];

        const profileResult = await client.query(
            `insert into public.profiles (user_id, username, first_name, last_name, avatar_url)
       values ($1, $2, $3, $4, $5)
       returning username, first_name, last_name, avatar_url`,
            [user.id, username, firstName ?? null, lastName ?? null, avatarUrl ?? null]
        );

        await client.query("COMMIT");

        const profile = profileResult.rows[0];

        return res.status(201).json({
            ok: true,
            user: {
                id: user.id,
                email: user.email,
                username: profile.username,
                firstName: profile.first_name,
                lastName: profile.last_name,
                avatarUrl: profile.avatar_url,
            },
        });
    } catch (err) {
        await client.query("ROLLBACK");

        // Postgres unique violation
        if (err?.code === "23505") {
            return res.status(409).json({ ok: false, error: "Email or username already in use" });
        }

        console.error(err);
        return res.status(500).json({ ok: false, error: "Server error" });
    } finally {
        client.release();
    }
});

router.post("/login", async (req, res) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ok:false, error: "Invalid Input"});
    }

    const {email, secret} = parsed.data;

    try{
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
            [email]
        );

        const sendLoginError = () =>
            res.status(401).json({ ok: false, error: "Invalid Credentials" });

        if(result.rowCount === 0) {
            console.log("Error location 1");
            return sendLoginError;
        }

        const userRow = result.rows[0];

        const valid = await verifyCredential(userRow.credential_hash, secret);
        if (!valid) {
            console.log("Error location 2");
            return sendLoginError
        }

        const token = signAccessToken(userRow.id)

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