import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import questionRoutes from './routes/questions.routes.js'
import answerRoutes from './routes/answer.routes.js'
import roomsRoutes from './routes/rooms.routes.js'
import adminRoutes from './routes/admin.routes.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);
app.use('/api/questions',questionRoutes);
app.use('/api/answers',answerRoutes);
app.use('/api/rooms', roomsRoutes);
app.use('/api/admin', adminRoutes);


export default app;
