import { SQSService } from '../../infrastructure/services/sqs.service';
import { Email } from '../../domain/entities/email.entity';
import { Consumer } from 'sqs-consumer';
import { sqsConfig } from '../../infrastructure/config/aws.config';

export class EmailConsumer {
    private readonly consumer: Consumer;
    private readonly sqsService: SQSService;

    constructor() {
        this.sqsService = new SQSService();
        this.consumer = this.sqsService.createConsumer(this.messageHandler.bind(this), sqsConfig.emailQueue);
        
        this.consumer.on('error', (err) => {
            console.error('Erro no consumer:', err);
        });

        this.consumer.on('processing_error', (err) => {
            console.error('Erro ao processar mensagem:', err);
        });
    }

    private sendEmail(emailEntity: Email): void {
        console.log("Enviando email", emailEntity)
    }

    private async handleEmailSent(emailEntity: Email): Promise<void> {
        console.log('Processando email:', {
            to: emailEntity.to,
            subject: emailEntity.subject,
            timestamp: emailEntity.timestamp
        });
        
        // Envia para a fila de emails processados
        const messageId = await this.sqsService.sendToEmailProcessedQueue(emailEntity.toJSON());
        console.log('Email enviado para fila de processados:', messageId);
    }

    private async messageHandler(messageBody: string): Promise<void> {
        try {
            const data = JSON.parse(messageBody);
            
            if (data.type !== 'email') {
                console.log('Mensagem ignorada - não é do tipo email');
                return;
            }

            const emailEntity = new Email(
                data.id,
                data.to,
                data.subject,
                data.body,
                data.timestamp,
                data.status
            );

            // Ação com o email
            this.sendEmail(emailEntity)
            await this.handleEmailSent(emailEntity);
        } catch (error) {
            console.error('Erro ao processar mensagem de email:', error);
            throw error;
        }
    }

    public start(): void {
        console.log('Iniciando consumer de emails...');
        this.consumer.start();
    }

    public stop(): void {
        console.log('Parando consumer de emails...');
        this.consumer.stop();
    }
}
