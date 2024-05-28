var jwt = require('jsonwebtoken');
const JWT_TKN = 'HashOPBolte';

const fetchuser = (req, res, next)=> {
    const token =  req.header('auth-token');
    if(!token){
        res.status(401).send({error: 'Something Wrong went'});
    }
    try {
        const data = jwt.verify(token, JWT_TKN);
        req.user = data.user;
        next();
    } catch (e) {
        res.status(401).send({error: 'Something Wrong went'});
        
    }

}
module.exports= fetchuser;