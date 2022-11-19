const config = require('config');
const jwt = require('jsonwebtoken');
const ForbiddenException = require('../exceptions/customExceptions/ForbiddenException');
const UnauthorizedException = require('../exceptions/customExceptions/UnauthorizedException')

function authUsingHeader(req, res, next, role = ""){
    const authHeader = req.headers.authorization;
    if(!authHeader) throw new UnauthorizedException('Access Denied. No token provided');
    const token = authHeader.split(' ')[1];
    if(!token) throw new UnauthorizedException('Access Denied. No token provided');

    try{
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        if(!role || (decoded.role === role)) next();
        else throw new ForbiddenException('Unauthorized');
    }
    catch (ex){
        next(ex);
    }
};

const authUsingCookie = (req, res, next) => {
    const token = req.cookies['jwtToken'];
    if(token){
        const validattionToken = jwt.verify(token, config.get('jwtPrivateKey'));
        if(validattionToken){
            res.user = validattionToken.id;
            next();
        }
        else{
            console.log('Token expired');
            res.status(401).send('Unauthorized resource').redirect('localhost:3000/api/users/login');
        };
    }
    else{
        console.log('Token not found');
        res.status(403).send('Forbidden resource').redirect('localhost:3000/');
    }
};

module.exports = {
    authUsingCookie, 
    authUsingHeader 
};