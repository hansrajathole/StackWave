import dotenv from 'dotenv';
dotenv.config();

const _config = {
    MONGODB_URI : process.env.MONGODB_URI || 'mongodb://localhost:27017/SackWave',
    PORT : process.env.PORT || 3000,
    JWT_SECRET : process.env.JWT_SECRET ,
    JWT_EXPAIRE_IN : process.env.JWT_EXPAIRE_IN ,
    REDIS_HOST : process.env.REDIS_HOST,
    REDIS_PORT : process.env.REDIS_PORT,
    REDIS_PASSWORD : process.env.REDIS_PASSWORD  ,
    JUDGE0_API_KEY : process.env.JUDGE0_API_KEY,
    JUDGE0_API_URL : process.env.JUDGE0_API_URL  
}

const config = Object.freeze(_config)
export default config