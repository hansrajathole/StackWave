const _config = {
    MONGODB_URI : process.env.MONGODB_URI || 'mongodb://localhost:27017/SackWave',
    PORT : process.env.PORT || 3000,
    JWT_SECRET : process.env.JWT_SECRET ,
    JWT_EXPIRATION : process.env.JWT_EXPIRATION       
}

const config = Object.freeze(_config)
export default config