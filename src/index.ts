import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';
import { requestLogger } from './middlewares/requestLogger';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: '⚠️ Rate limit exceeded. Please try again later.',
  },
});

app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  app.use(requestLogger);
}

app.use(limiter);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🇳🇬 Nigeria States & LGAs API is running',
    documentation: '/api/v1',
  });
});

app.use('/api/v1', routes);

app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📚 API documentation available at http://localhost:${PORT}/api/v1`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;

