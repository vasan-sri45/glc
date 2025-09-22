import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import authRouter from './router/authRoutes.js';
import adminRouter from './router/adminRoutes.js';
import employeeRouter from './router/employeeRoutes.js';
import tableRouter from './router/tableRoutes.js';
import attendenceRouter from './router/attendenceRoutes.js';
import messageRouter from './router/messageRoutes.js';
import personalRouter from './router/PersonalRoutes.js';
import ticketRouter from './router/ticketRoutes.js';
import folderRouter from './router/folderRoutes.js';
import path from "path";

dotenv.config();
const app = express();

const Port = process.env.PORT || 4500;

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

const ORIGINS = [process.env.CLIENT_ORIGIN, 'http://localhost:5173'].filter(Boolean); // exact origins [web:23]
const corsOptions = {
  origin(origin, cb) {
    if (!origin) return cb(null, true);                           // non‑browser or same‑origin [web:11]
    return ORIGINS.includes(origin) ? cb(null, true) : cb(new Error('CORS: origin not allowed')); // reflect allowed origin [web:23]
  },
  credentials: true,                                              // Access-Control-Allow-Credentials: true [web:14]
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],       // preflight allow [web:11]
  allowedHeaders: ['Content-Type','Authorization'],               // preflight allow [web:11]
};
app.use(cors(corsOptions));                                       // add CORS early [web:23]
// app.options('*', cors(corsOptions));   



app.use('/api/auth',authRouter);
app.use('/api/data',adminRouter);
app.use('/api/employee',employeeRouter);
app.use('/api/table',tableRouter);
app.use('/api/attendance',attendenceRouter);
app.use('/api/message',messageRouter);
app.use('/api/personal',personalRouter);
app.use('/api/support', ticketRouter);
app.use('/api/folder', folderRouter);

app.set('trust proxy', 1);

app.listen(Port,()=>{
    console.log(`server is running : ${Port}`);
    connectDB();
});