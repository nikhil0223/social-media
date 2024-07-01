import jwt from "jsonwebtoken";

export const isAuth = (req,res,next) =>{
    const authHeader = req.get('Authorization');
    if(!authHeader){
        throw new Error ('Not Authenticated');
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken= jwt.verify(token,process.env.JWT_TOKEN_KEY);
    } catch (error) {
        throw err;
    }
    if(!decodedToken){
        throw new Error('Not Authenticated');
    }
    req.id = decodedToken.id;
    next();
};