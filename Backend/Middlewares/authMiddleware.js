import  jwt, { decode } from 'jsonwebtoken'
import asyncHandler from '../Utils/asyncHandler.js'
import User from '../Model/User.Model.js'

const authenticate=asyncHandler(async(req,res,next)=>{
    let token;
    // Now we will read JWT(token name) from 'jwt' cookie
        token=req.cookies.jwt;

        if(token){
           try{
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            const user=await User.findById(decoded.userId).select("-password")
            if(!user) throw Error("Invalid token")
            req.user=user
            next();
           } catch(error){
            res.status(401)
            throw new Error("Not authorized,token failed")
           }
        }else{
           throw new Error("Not authorized,no token") 
        }
})

export {authenticate}