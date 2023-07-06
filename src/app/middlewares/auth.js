const jwt = require('jsonwebtoken');

module.exports = function verifyToken(req, res, next){
    // console.log( req.headers);
    const token = req.cookies.jwt;

    if(!token){
        // return res.status(403).send('A token is required for authentication');
        return res.redirect('/auth/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        // console.log({decoded});
        res.locals.username = decoded.username;
    } catch (error) {
        return res.status(401).send('Unauthorized!');
    }

    next();
}