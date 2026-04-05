const jwt = require('jsonwebtoken');

function authenticateWithJWT(req,res,next){
    const authHeader=req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")){
        throw new Error ("Authorisation header missing")
    }

    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        req.userRole = decoded.userRole;
        next();
    } catch{
        return res.status(403).json({
            "message":"Invalid or expired token"
        })
    }

};

module.exports= authenticateWithJWT;