import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import routes from './routes/routes.js';
import compression from 'compression';
import helmet from 'helmet';
import dotenv from 'dotenv';
import createError from 'http-errors';

dotenv.config();
const app = express();

app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: process.env.RATE_LIMIT_MAX || 100,
    message: 'Too many requests from this IP, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200
}));

app.use(compression({
    level: 6,
    threshold: 10 * 1024,
    filter: (req, res) => {
        if(req.headers['x-no-compression']) return false;
        return compression.filter(req, res);
    }
}));

app.use(express.json({
    limit: '10kb',
    strict: true
}));

app.use(express.urlencoded({
    extended: true,
    limit: '10kb',
    parameterLimit: 10
}));

app.use('/api', routes);

app.use((req, res, next) => {
    next(createError(404, 'Endpoint not found'));
});

export default app;