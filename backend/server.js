import express from 'express'
import connectDB from './config/mongodb.js'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import connectCloudinary from './config/cloudinary.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();
await connectDB();
await connectCloudinary();


const app=express();

//middlewares
app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET','POST','DELETE','PATCH'],
    credentials:true
}))
app.use(express.json()); 
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.use('/user',userRoutes);
app.use('/blog',blogRoutes);
app.get('/',(req,res)=>{
    res.end('Response from server');
})

app.use((req,res)=>{
    res.status(404).json({success:false,message:'Invalid Route'});
})
app.listen(4000,'localhost',()=>{
    console.log('running server on 4000 port');
})