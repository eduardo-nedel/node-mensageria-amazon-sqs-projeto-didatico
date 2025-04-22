import { EmailStatus } from "../enum/emailStatus.enum";

export class Email {
    constructor(
        public readonly id: string,
        public readonly to: string,
        public readonly subject: string,
        public readonly body: string,
        public readonly timestamp: string = new Date().toISOString(),
        public status: EmailStatus = EmailStatus.PENDING
    ) {}

    static create(to: string, subject: string, body: string): Email {
        return new Email(
            Math.random().toString(36).substring(2, 15),
            to,
            subject,
            body
        );
    }

    toJSON(): Record<string, any> {
        return {
            id: this.id,
            to: this.to,
            subject: this.subject,
            body: this.body,
            timestamp: this.timestamp,
            status: this.status,
            type: 'email'
        };
    }
} 
