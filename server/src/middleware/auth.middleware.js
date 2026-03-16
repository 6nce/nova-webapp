import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
    console.log("AUTH HEADER:", req.headers.authorization);
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    console.log("TOKEN:", token);
    console.log("TOKEN BOOL:", Boolean(token));
    console.log("TOKEN RIGHT BEFORE CHECK:", token, typeof token);

    if (!token) {
        console.log("FAILED TOKEN VALUE:", JSON.stringify(token));
        return res.status(401).json({ ok:false, error: "Token not found" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        console.log('PAYLOAD:', payload);
        req.userId = payload.sub;
        next();
    } catch(err){
        console.log("JWT ERROR:", err.message);
        return res.status(401).json({ok:false, error: 'Invalid or Expired Token'});
    }
}