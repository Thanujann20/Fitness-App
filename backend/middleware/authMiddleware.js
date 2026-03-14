import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        console.log("verifyToken: No authorization header")
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        console.error("verifyToken: JWT_SECRET is not set")
        return res.status(500).json({ message: "Server config error" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.log("verifyToken: token verify error", err.message, "token=", token, "secretExists=", !!JWT_SECRET)
        res.status(401).json({ message: "Invalid or expired token" });
    }
}