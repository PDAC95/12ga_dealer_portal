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
  sessionId?: string;
  reason: string;
}

export interface EscalateResponse {
  success: boolean;
  data: {
    ticketId: string;
    ticketNumber: string;
    status: TicketStatus;
    message: string;
    estimatedResponse: string;
  };
}

// Ticket types
export type TicketStatus = 'pending' | 'assigned' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'normal' | 'high' | 'urgent';

export interface EscalationTicket {
  _id: string;
  ticketNumber: string;
  status: TicketStatus;
  priority: TicketPriority;
  escalationReason: string;
  resolution?: {
    response: string;
    resolvedAt: Date;
  };
  createdAt: Date;
  resolvedAt?: Date;
}

export interface TicketListResponse {
  success: boolean;
  data: EscalationTicket[];
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
