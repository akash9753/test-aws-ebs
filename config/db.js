import mongoose from 'mongoose';
const connectDB = async() =>{
    try{
      await mongoose.connect(process.env.MONGO_URI)
      console.log(`Mongodb connected ${mongoose.connection.host}`);
    }catch(error){
      console.log(`MongoDB Server Issue ${error}`);
    }
}

export default connectDB;
