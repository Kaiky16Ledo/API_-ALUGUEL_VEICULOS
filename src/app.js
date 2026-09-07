import express from 'express';
import cors from 'cors';
import apiRouter from './routes/index.js';
import { setupSwagger } from './docs/swagger.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());

setupSwagger(app);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API de Gestão e Aluguel de Veículos operacional!',
    timestamp: new Date()
  });
});

app.use('/api/v1', apiRouter);

// Middleware Global de Tratamento de Erros (deve ser o último app.use)
app.use(errorHandler);

export default app;