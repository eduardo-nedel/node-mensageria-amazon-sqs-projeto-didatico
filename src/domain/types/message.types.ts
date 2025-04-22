export interface BaseMessage {
  type: string;
  timestamp: string;
}

export interface EmailMessage extends BaseMessage {
  type: 'email';
  id?: string;
  to: string;
  subject: string;
  body: string;
  timestamp: string;
}
