const jwt = require("jsonwebtoken");
const user = require("../model/user");
require('dotenv').config()
const { TOKEN_KEY } = process.env

const verfyToken = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.params.token || req.headers["x-access-token"];
    console.log("Token " + token)
    if (!token) {
        return res.status(403).json({ errors: ["The token is requered either from specified scources Help :- req.body.token || req.query.token || req.params.token || req.headers['x-access-token']"] })
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY)

        const useFromDB = await user.findOne({ email: decoded.email })
        if (!useFromDB) {
            return res.status(403).json({ errors: ["Invalid login found"] });
        }

        req.user = decoded;
        req.user.roles = useFromDB.roles
    } catch (error) {
        return res.status(401).json({ errors: ["The token is invalid " + error] })
    }
    return next();
}

module.exports = verfyToken