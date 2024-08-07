import express from 'express';
import { config } from 'dotenv';
import { dbConnection } from './database/dbConnection.js';
import userRouter from './router/user.router.js';
import cookieParser from 'cookie-parser';
import taskRouter from './router/task.router.js';
import cors from 'cors';

const app = express();
config({ path: 'config/.env' });

console.log('Frontend URI:', process.env.FRONTEND_URI); // Log the FRONTEND_URI to verify it is correct

const corsOptions = {
    origin: process.env.FRONTEND_URI,
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
    credentials: true,
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable preflight for all routes

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.use('/api/v1/user', userRouter);
app.use('/api/v1/task', taskRouter);

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

dbConnection();

export default app;
