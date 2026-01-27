import { apiClient } from '@/lib/axios';
import type {
  SendMessageRequest,
  SendMessageResponse,
  ChatHistoryResponse,
  EscalateRequest,
  EscalateResponse,
} from '../types/chat.types';

export const chatService = {
  /**
   * Send a message to the AI chat
   */
  sendMessage: async (request: SendMessageRequest): Promise<SendMessageResponse> => {
    const { data } = await apiClient.post<SendMessageResponse>(
      '/api/dealers/chat/message',
      request
    );
    return data;
  },

  /**
   * Get chat history for the current dealer
   */
  getHistory: async (sessionId?: string): Promise<ChatHistoryResponse> => {
    const params = sessionId ? { sessionId } : {};
    const { data } = await apiClient.get<ChatHistoryResponse>(
      '/api/dealers/chat/history',
      { params }
    );
    return data;
  },

  /**
   * Escalate chat to human support
   */
  escalate: async (request: EscalateRequest): Promise<EscalateResponse> => {
    const { data } = await apiClient.post<EscalateResponse>(
      '/api/dealers/chat/escalate',
      request
    );
    return data;
  },
};
