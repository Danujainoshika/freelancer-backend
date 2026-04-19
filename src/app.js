import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import incomeRoutes from "./routes/income.routes.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
import apiRateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();

app.use(helmet());
app.use(morgan('dev'));

app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRateLimiter);

app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running'
    });
});

app.use('/api/income-records', incomeRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;

