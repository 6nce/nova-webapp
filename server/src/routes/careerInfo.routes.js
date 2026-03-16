import express from 'express';
import {z} from "zod";
import {requireAuth} from "../middleware/auth.middleware.js";
import {pool} from "../db/pool.js";

const router = express.Router();

const careerInfoSchema = z.object({
    degree: z.string().optional().or(z.literal('')),
    linkedin_url: z.string().optional().or(z.literal('')),
    portfolio_url: z.string().optional().or(z.literal('')),
    skills: z.string().optional().or(z.literal('')),
});

//Routing | POST
router.post("/", requireAuth, async (req, res) => {
    const parsed = careerInfoSchema.safeParse(req.body);

    if(!parsed.success) {
        return res.status(400).json({ok:false, error: "Invalid Input"});
    }
    const {degree, linkedin_url, portfolio_url, skills} = parsed.data;
    const userId = req.userId

    try {
        const skillsArray = JSON.stringify(skills.split(',').map(s => s.trim()));
        const result = await pool.query(
            `INSERT INTO career_info (user_id, degree, linkedin_url, portfolio_url, skills)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *
            `,
            [userId, degree, linkedin_url, portfolio_url, skillsArray]);
        return res.status(201).json({ok: true, userCareerInfo: result.rows[0]});
    }catch (error) {
            console.log(error);
            return res.status(500).json({ok:false, error: error});
        }
})

//ROUTING | GET
router.get("/", requireAuth, async (req, res) => {
    try{
        const result = await pool.query("SELECT * FROM career_info WHERE user_id = $1", [req.userId]);
        return res.json({ok:true, userCareerInfo:result.rows[0]});
    } catch (error) {
        return res.status(500).json({ok:false, error: error});
    }
})

export default router;