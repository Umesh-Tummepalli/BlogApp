import mongoose from 'mongoose';

export async function connectDB(){
    try{
        await mongoose.connect(`${process.env.MONGODB_URL}/blogApp`);
        console.log('connected to db');
    }
    catch(err){
        console.log('error in db connection : ',err.message);
    }
}

process.on('SIGINT',()=>{
    try{
        mongoose.connection.close();
        process.exit(0);
    }
    catch(err){
        console.log('Error in disconnecting database');
        process.exit(1);
    }
})

export default connectDB;