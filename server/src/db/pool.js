import pg from "pg";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbUrl = new URL(process.env.DATABASE_URL);

const caPath = path.join(__dirname, "../../certs/prod-ca-2021.crt");
const ca = fs.readFileSync(caPath, "utf8");

export const pool = new pg.Pool({
    host: dbUrl.hostname,
    port: Number(dbUrl.port || 5432),
    database: dbUrl.pathname.replace("/", ""),
    user: decodeURIComponent(dbUrl.username),
    password: decodeURIComponent(dbUrl.password),

    ssl: {
        ca,
        rejectUnauthorized: true,
    },
});

