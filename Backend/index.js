import express from  'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config()
const port =process.env.PORT|| 5000;
const app=express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());


//DataBase

import connectDB from './Config/db.js';
connectDB();

//Routes
import userRoutes from "./Routes/userRoutes.js"
import taskRoutes from "./Routes/taskRoutes.js"
app.use('/api/user',userRoutes);
app.use('/api/task',taskRoutes);

app.listen(port,()=>{
    console.log(`Server has started on port ${port} ✅`)
})