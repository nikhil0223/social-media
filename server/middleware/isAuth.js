import jwt from "jsonwebtoken";

export const isAuth = (req,res,next) =>{
    const authHeader = req.get('Authorization');
    if(!authHeader){
        throw new Error ('Not Authenticated');
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken= jwt.verify(token,'secret');
    } catch (error) {
        console.log(err);
        throw err;
    }
    if(!decodedToken){
        throw new Error('Not Authenticated');
    }
    console.log(decodedToken.id);
    req.id = decodedToken.id;
    next();
};