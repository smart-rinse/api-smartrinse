import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (e, decoded)=>{
        if(e) return res.sendStatus(403);
        req.email = decoded.email;
        req.user = decoded;
        next();
    })
}