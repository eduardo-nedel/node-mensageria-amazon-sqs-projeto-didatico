import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { Consumer } from 'sqs-consumer';
import { awsConfig, sqsConfig } from '../config/aws.config';
import { EmailStatus } from '../../domain/enum/emailStatus.enum';

export class SQSService {
    private readonly sqsClient: SQSClient;

    constructor() {
        this.sqsClient = new SQSClient(awsConfig);
    }

    createConsumer(handler: (message: string) => Promise<void>, queueUrl: string): Consumer {
        return Consumer.create({
            queueUrl,
            handleMessage: async (message) => {
                await handler(message.Body ?? '');
            },
            sqs: this.sqsClient,
            pollingWaitTimeMs: 20000
        });
    }

    async sendEmailMessage(message: string): Promise<string> {
        const command = new SendMessageCommand({
            MessageBody: message,
            QueueUrl: sqsConfig.emailQueue
        });

        const result = await this.sqsClient.send(command);
        return result.MessageId ?? '';
    }

    async sendToEmailProcessedQueue(message: any): Promise<string> {
        const processedMessage = {
            MessageBody: JSON.stringify({
                ...message,
                status: EmailStatus.PROCESSED,
                processedAt: new Date().toISOString()
            }),
            MessageAttributes: {
                Status: {
                    DataType: 'String',
                    StringValue: EmailStatus.PROCESSED
                },
                EmailId: {
                    DataType: 'String',
                    StringValue: message.id ?? 'sem-id'
                }
            },
            QueueUrl: sqsConfig.emailProcessedQueue
        };

        const command = new SendMessageCommand(processedMessage);
        const result = await this.sqsClient.send(command);
        return result.MessageId ?? '';
    }
} 
