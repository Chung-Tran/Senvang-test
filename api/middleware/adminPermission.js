const jwt = require("jsonwebtoken");

function adminPermisson(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ error: "No token provided" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid or expired token" });
        if(user?.role !=='admin')  
            return res.status(403).json({ error: "Invalid permission" });
        // req.user = user;
        next();
    });
}

module.exports = adminPermisson;
