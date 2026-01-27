export type MessageRole = 'user' | 'assistant' | 'system';

export type ChatStatus = 'active' | 'escalated' | 'closed';

export interface IChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  isEscalated?: boolean;
}

export interface IChatSession {
  _id: string;
  dealerId: string;
  messages: IChatMessage[];
  status: ChatStatus;
  escalatedAt?: Date;
  escalationReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SendMessageRequest {
  message: string;
  sessionId?: string;
}

export interface SendMessageResponse {
  success: boolean;
  data: {
    sessionId: string;
    message: IChatMessage;
    response: IChatMessage;
  };
}

export interface ChatHistoryResponse {
  success: boolean;
  data: IChatSession;
}

export interface EscalateRequest {
  sessionId: string;
  reason: string;
}

export interface EscalateResponse {
  success: boolean;
  data: {
    sessionId: string;
    status: ChatStatus;
    escalatedAt: Date;
  };
  message: string;
}

// Attachment interface for images/files
export interface ChatAttachment {
  id: string;
  type: 'image';
  file: File;
  preview: string; // Data URL for preview
  name: string;
}

// Local message for optimistic updates
export interface LocalMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  isPending?: boolean;
  isError?: boolean;
  attachments?: ChatAttachment[];
}
