import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) return res.status(401).json({ ok:false, error: "Token not found" });

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = payload.sub;
        next();
    } catch(err){
        return res.status(401).json({ok:false, error: 'Invalid or Expired Token'});
    }
}