import { SQSClient } from '@aws-sdk/client-sqs';

export const awsConfig = {
    endpoint: process.env.AWS_ENDPOINT ?? 'http://localhost:4566',
    region: process.env.AWS_REGION ?? 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? 'test',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? 'test'
    }
};

export const sqsConfig = {
    emailQueue: process.env.EMAIL_QUEUE_URL ?? 'http://localhost:4566/000000000000/minha-queue-exemplo',
    emailProcessedQueue: process.env.PROCESSED_QUEUE_URL ?? 'http://localhost:4566/000000000000/email-processado'
};

export const createSQSClient = () => new SQSClient(awsConfig); 
