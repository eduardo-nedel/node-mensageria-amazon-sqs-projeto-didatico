import { Router } from 'express';
import { SQSService } from '../../infrastructure/services/sqs.service';
import { EmailMessage } from '../../domain/types/message.types';

const router = Router();
const sqsService = new SQSService();

router.post('/email', async (req, res) => {
  try {
    const { to, subject, body } = req.body;

    if (!to || !subject || !body) {
      return res.status(400).json({
        error: 'Campos obrigatórios faltando',
        required: ['to', 'subject', 'body']
      });
    }

    const emailMessage: EmailMessage = {
      type: 'email',
      timestamp: new Date().toISOString(),
      to,
      subject,
      body
    };

    await sqsService.sendEmailMessage(JSON.stringify(emailMessage));

    return res.status(202).json({
      message: 'Email enviado para processamento',
      data: {
        to,
        subject,
        timestamp: emailMessage.timestamp
      }
    });
  } catch (error) {
    console.error('Erro ao enviar email para a fila:', error);
    return res.status(500).json({
      error: 'Erro interno ao processar a requisição'
    });
  }
});

export default router; 
