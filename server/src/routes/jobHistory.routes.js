import express from "express";
import {requireAuth} from "../middleware/auth.middleware.js";
import {pool} from "../db/pool.js";
import {z} from "zod";

//Setup
const router = express.Router();
const fieldRegex = /^[a-zA-Z0-9_]+$/;

//Schema
const jobHistorySchema = z.object({
    company_name: z.string(),
    job_title: z.string().max(50),
    start_date: z.string(),
    end_date: z.string().optional(),
    is_current: z.boolean().optional(),
    description: z.string().max(256).optional(),
});

//Routing | POST
router.post("/", requireAuth, async (req, res) => {
    const parsed = jobHistorySchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ok:false, error: "Invalid Input"});
    }
    const {company_name, job_title, start_date, end_date, is_current, description} = parsed.data;

    const userId = req.userId;

    try{
    const result = await pool.query(
        `INSERT INTO job_history (user_id, company_name, job_title, start_date, end_date, is_current, description) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
        [userId, company_name, job_title, start_date, end_date, is_current, description]
        );
        return res.status(201).json({ok: true, job: result.rows[0]});
    } catch(err){
        return res.status(500).json({ok:false, error: 'Internal Server Error'});
    }
})

//ROUTING | GET
router.get("/", requireAuth, async (req, res) => {
    try{
       const result = await pool.query("SELECT * FROM job_history WHERE user_id = $1", [req.userId]);
       return res.json({ok:true, jobs:result.rows});
    } catch (error) {
        return res.status(500).json({ok:false, error: "Internal Server Error"});
    }
});

export default router;