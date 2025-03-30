import mongoose from 'mongoose';
import config from '../config/config.js';

const connectDB = ()=>{
    console.log(config.MONGODB_URI);
    
    mongoose.connect(config.MONGODB_URI)
    .then(()=>{
        console.log('MongoDB connected')
    })
    .catch((err)=>{
        console.log('MongoDB connection error:', err)
    })
}

export default connectDB