import dotenv from 'dotenv';
dotenv.config();
const _config = {
    MONGODB_URI : process.env.MONGODB_URI || 'mongodb://localhost:27017/SackWave',
    PORT : process.env.PORT || 3000,
    JWT_SECRET : process.env.JWT_SECRET ,
    JWT_EXPAIRE_IN : process.env.JWT_EXPAIRE_IN       
}

const config = Object.freeze(_config)
export default config