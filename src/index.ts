import express from 'express';
import emailRoutes from './api/routes/email.routes';
import dotenv from 'dotenv';
import { EmailConsumer } from './core/consumers/email.consumer';

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rotas
app.use('/api', emailRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Inicia o consumer de email
const emailConsumer = new EmailConsumer();
emailConsumer.start();

// Tratamento de erros não capturados
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Erro não tratado:', err);
  res.status(500).json({
    error: 'Erro interno do servidor'
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`API disponível em http://localhost:${port}/api`);
}); 
