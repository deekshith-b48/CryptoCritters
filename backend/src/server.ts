import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { errorMiddleware } from './middleware/errorMiddleware.js';
import critterRoutes from './routes/critters.js';
import healthRoutes from './routes/health.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

app.use('/api/critters', critterRoutes);
app.use('/api/health', healthRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`🐾 CryptoCritters API running on port ${PORT}`);
});

export default app;
