import express from 'express';
import morgan from 'morgan'
import cors from 'cors';
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/users.routes.js'
import questionRoutes from './routes/questions.routes.js'
import answerRoutes from './routes/answer.routes.js'
import roomsRoutes from './routes/rooms.routes.js'
import adminRoutes from './routes/admin.routes.js'
import codeRoutes from './routes/code.routes.js'
import aiRoutes from './routes/ai.routes.js'
import config from './config/config.js'
import configurePassport from './services/passport.service.js';
import passport from 'passport';

const app = express();

const allowedOrigin = config.BASE_URL
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true
  })
);
configurePassport();
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"))

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes);
app.use('/api/rooms', roomsRoutes);
app.use('/api/admin', adminRoutes);
app.use("/api/code", codeRoutes); 
app.use("/api/ai", aiRoutes); 


export default app;
