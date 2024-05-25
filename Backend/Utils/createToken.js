import jwt from 'jsonwebtoken'

const generateToken=(res,userId)=>{
    const token=jwt.sign(
        {userId},
        process.env.JWT_SECRET,
        {expiresIn:"10d"}
        )
//Now we will set the jwt as HTTP-only cookie

res.cookie('jwt',token,{
    httpOnly:true,
    secure:true,
    sameSite:'strict',
    maxAge:30*24*60*60*1000
    
})
return token;        
};

export default generateToken
