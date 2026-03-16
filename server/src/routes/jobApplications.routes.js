import express from 'express';
import { z } from 'zod';
import {requireAuth} from "../middleware/auth.middleware.js";
import {pool} from "../db/pool.js";

const router = express.Router();

//Schema
const jobApplicationSchema = z.object({
    company:z.string(),
    position: z.string(),
    application_link: z.string().optional().or(z.literal('')),
    salary_min: z.coerce.number().optional(),
    salary_max: z.coerce.number().optional(),
    location: z.string().optional().or(z.literal('')),
    listing_date: z.string().optional().or(z.literal('')),
    status: z.enum(['saved', 'applied', 'interviewing', 'offer', 'no_offer', 'withdrawn']).optional(),
    work_type: z.enum(['remote','hybrid','in_office']).optional(),
    work_location: z.string().optional().or(z.literal('')),
    responsibilities: z.string().optional().or(z.literal('')),
    requirements: z.string().optional().or(z.literal('')),
    benefits: z.string().optional().or(z.literal('')),
    cover_letter: z.boolean().optional(),
    personal_notes: z.string().optional().or(z.literal('')),
    role_rating: z.coerce.number().min(1).max(5).optional(),
    fit_rating: z.coerce.number().min(1).max(5).optional(),
})

//Routing | POST
router.post("/", requireAuth, async (req, res) => {
    const parsed = jobApplicationSchema.safeParse(req.body);
    if(!parsed.success) {
        console.log(parsed);
        return res.status(400).json({ok:false, error: "Invalid Input"});
    }

    const {
        company, position, application_link, salary_min, salary_max,
        location, listing_date, status, work_type, work_location,
        responsibilities, requirements, benefits, cover_letter,
        personal_notes, role_rating, fit_rating
    } = parsed.data;

    const userId = req.userId;

    try {
        const result = await pool.query(
            `INSERT INTO job_applications (
                user_id, company, position, application_link, salary_min, salary_max,
                location, listing_date, status, position_type, location_type,
                responsibilities, requirements, benefits, cover_letter,
                personal_notes, role_rating, fit_rating
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18
            ) RETURNING *`,
            [
                userId, company, position, application_link, salary_min, salary_max,
                location, listing_date, status, work_type, work_location,
                responsibilities, requirements, benefits, cover_letter,
                personal_notes, role_rating, fit_rating
            ]
        );
        return res.status(201).json({ ok: true, application: result.rows[0] });
    } catch (err) {
        console.error("Job Application Insert Error:", err);
        return res.status(500).json({ ok: false, error: "Internal Server Error" });
    }
});

router.get("/", requireAuth, async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM job_applications WHERE user_id = $1 ORDER BY created_at DESC",
            [req.userId]
        );
        return res.json({ ok: true, applications: result.rows });
    } catch (err) {
        console.error("Job Application Fetch Error:", err);
        return res.status(500).json({ ok: false, error: "Internal Server Error" });
    }
});

export default router;