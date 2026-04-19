import {rateLimit} from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();

const apiRateLimiter = rateLimit({
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS),
    max: Number(process.env.RATE_LIMIT_MAX_REQUESTS),
    standardHeaders: true,
    legacyHeaders: false,
    message:{
        success: false,
        message: 'Too many requests from this IP, please try again later.'
    }
});

export default apiRateLimiter;