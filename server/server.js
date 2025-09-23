// import express from 'express';
// import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import connectDB from './config/mongodb.js';
// import authRouter from './router/authRoutes.js';
// import adminRouter from './router/adminRoutes.js';
// import employeeRouter from './router/employeeRoutes.js';
// import tableRouter from './router/tableRoutes.js';
// import attendenceRouter from './router/attendenceRoutes.js';
// import messageRouter from './router/messageRoutes.js';
// import personalRouter from './router/PersonalRoutes.js';
// import ticketRouter from './router/ticketRoutes.js';
// import folderRouter from './router/folderRoutes.js';
// import path from "path";
// import { fileURLToPath } from 'url';

// dotenv.config();
// const app = express();

// const Port = process.env.PORT || 4500;

// app.use(express.json());
// app.use(cookieParser());

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename); // ESM-safe dirname [web:39]



// const ORIGINS = [process.env.CLIENT_ORIGIN, 'http://localhost:5173'].filter(Boolean); // exact origins [web:23]
// const corsOptions = {
//   origin(origin, cb) {
//     if (!origin) return cb(null, true);                           // non‑browser or same‑origin [web:11]
//     return ORIGINS.includes(origin) ? cb(null, true) : cb(new Error('CORS: origin not allowed')); // reflect allowed origin [web:23]
//   },
//   credentials: true,                                              // Access-Control-Allow-Credentials: true [web:14]
//   methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],       // preflight allow [web:11]
//   allowedHeaders: ['Content-Type','Authorization'],               // preflight allow [web:11]
// };
// app.use(cors(corsOptions));                                       // add CORS early [web:23]
// // app.options('*', cors(corsOptions));   



// app.use('/api/auth',authRouter);
// app.use('/api/data',adminRouter);
// app.use('/api/employee',employeeRouter);
// app.use('/api/table',tableRouter);
// app.use('/api/attendance',attendenceRouter);
// app.use('/api/message',messageRouter);
// app.use('/api/personal',personalRouter);
// app.use('/api/support', ticketRouter);
// app.use('/api/folder', folderRouter);

// app.use(express.static(path.join(__dirname, 'dist')));
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
// });

// app.set('trust proxy', 1);

// app.listen(Port,()=>{
//     console.log(`server is running : ${Port}`);
//     connectDB();
// });

// ESM Express 5 server that serves API + SPA safely on Render

import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4500;

// ESM-safe __dirname/__filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Core middleware
app.use(express.json());
app.use(cookieParser());

// CORS: allow exact origins only (Render Static Site URL + local dev)
const ORIGINS = [process.env.CLIENT_ORIGIN, 'http://localhost:5173'].filter(Boolean);
const corsOptions = {
  origin(origin, cb) {
    if (!origin) return cb(null, true);
    return ORIGINS.includes(origin) ? cb(null, true) : cb(new Error('CORS: origin not allowed'));
  },
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
};
app.use(cors(corsOptions));
// Optional explicit preflight handler
// app.options('*', cors(corsOptions));
const distDir = path.resolve(__dirname, 'dist');
app.use(express.static(distDir));

// API routes
app.use('/api/auth', authRouter);
app.use('/api/data', adminRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/table', tableRouter);
app.use('/api/attendance', attendenceRouter);
app.use('/api/message', messageRouter);
app.use('/api/personal', personalRouter);
app.use('/api/support', ticketRouter);
app.use('/api/folder', folderRouter);

// Serve SPA static assets (adjust 'dist' if your build folder differs)


// SPA fallback WITHOUT a path string (avoids Express 5 wildcard errors)
// Only handle GET requests that are not /api/*, then send index.html
app.use((req, res, next) => {
  if (req.method !== 'GET') return next();
  if (req.path.startsWith('/api')) return next();
  return res.sendFile(path.join(distDir, 'index.html'));
});

// Trust Render proxy for correct protocol/host on redirects/cookies
app.set('trust proxy', 1);

// Start server
app.listen(PORT, () => {
  console.log(`server is running : ${PORT}`);
  connectDB();
});
