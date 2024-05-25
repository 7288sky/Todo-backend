import User from "../Model/User.Model.js";
import asyncHandler from "../Utils/asyncHandler.js";
import createToken from "../Utils/createToken.js"
import bcrypt from 'bcryptjs'


//Controllers
const createUser=asyncHandler(async(req,res)=>{
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        throw new Error('Please fill all fields')
    }
    const userExists = await User.findOne({ email }); // checking Allready existed user
    if (userExists) res.status(400).send("User already existed")
    // Now we will start to create the user 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new User({ username, email, password: hashedPassword })
    try {
        await newUser.save()
        createToken(res,newUser._id);
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
        })
    } catch (error) {
        res.status(400)
        throw new Error("Invaliid user data")
    }
})

const loginUser=asyncHandler(async(req,res)=>{

    const {email,password}=req.body
    const existedUser=await User.findOne({email})
    
    if(existedUser){
        const isPasswordValid=await bcrypt.compare(password,existedUser.password)
        if(isPasswordValid){
            createToken(res,existedUser._id);
    
        return  res.status(201).json({
                _id: existedUser._id,
                username: existedUser.username,
                email: existedUser.email,
            })  
        }else{
                return res.status(400).json("Invalid password")     
        }
    }else{
        return res.status(404).json("Invalid Email")
    }
    
    })

 const logoutCurrentUser=asyncHandler(async(req,res)=>{
        res.cookie(
            'jwt',
            '',
            {
                httpOnly:true,
                expires: new Date(0),
            }
            )
            res.status(200).json({message:"Lougout successfully"})
        })

export {
    createUser,
    loginUser,
    logoutCurrentUser
}