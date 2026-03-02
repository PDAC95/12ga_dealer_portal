import { useState, useCallback } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { chatService } from '../services/chatService';
import type { LocalMessage, EscalateRequest, ChatAttachment } from '../types/chat.types';

/**
 * Generate a unique ID for local messages
 */
const generateId = () => `local-${Date.now()}-${Math.random().toString(36).slice(2)}`;

/**
 * Main hook for chat functionality
 */
export const useChat = () => {
  const [messages, setMessages] = useState<LocalMessage[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [lastTicket, setLastTicket] = useState<{ ticketNumber: string; status: string } | null>(null);

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: chatService.sendMessage,
    onMutate: async (variables: { message: string; sessionId?: string; attachments?: ChatAttachment[] }) => {
      // Add optimistic user message
      const userMessage: LocalMessage = {
        id: generateId(),
        role: 'user',
        content: variables.message,
        timestamp: new Date(),
        isPending: true,
        attachments: variables.attachments,
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);
      return { userMessage };
    },
    onSuccess: (response, _, context) => {
      // Update user message to confirmed and add assistant response
      setMessages((prev) => {
        const updated = prev.map((msg) =>
          msg.id === context?.userMessage.id
            ? { ...msg, isPending: false, id: response.data.message.id }
            : msg
        );
        return [
          ...updated,
          {
            id: response.data.response.id,
            role: response.data.response.role,
            content: response.data.response.content,
            timestamp: new Date(response.data.response.timestamp),
          },
        ];
      });
      setSessionId(response.data.sessionId);
      setIsTyping(false);
    },
    onError: (_, __, context) => {
      // Mark message as error
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === context?.userMessage.id
            ? { ...msg, isPending: false, isError: true }
            : msg
        )
      );
      setIsTyping(false);
    },
  });

  // Escalate mutation
  const escalateMutation = useMutation({
    mutationFn: (request: EscalateRequest) => chatService.escalate(request),
    onSuccess: (response) => {
      // Store ticket info
      setLastTicket({
        ticketNumber: response.data.ticketNumber,
        status: response.data.status,
      });

      // Add system message about escalation with ticket number
      const systemMessage: LocalMessage = {
        id: generateId(),
        role: 'system',
        content: `Ticket #${response.data.ticketNumber} created. A specialist will respond within ${response.data.estimatedResponse}.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, systemMessage]);
    },
  });

  // Send a message
  const sendMessage = useCallback(
    (content: string, attachments?: ChatAttachment[]) => {
      if (!content.trim() && (!attachments || attachments.length === 0)) return;
      sendMessageMutation.mutate({
        message: content.trim(),
        sessionId: sessionId || undefined,
        attachments,
      });
    },
    [sessionId, sendMessageMutation]
  );

  // Escalate to human support
  const escalateToHuman = useCallback(
    (reason: string) => {
      escalateMutation.mutate({ reason });
    },
    [escalateMutation]
  );

  // Clear chat
  const clearChat = useCallback(() => {
    setMessages([]);
    setSessionId(null);
  }, []);

  // Retry failed message
  const retryMessage = useCallback(
    (messageId: string) => {
      const failedMessage = messages.find(
        (msg) => msg.id === messageId && msg.isError
      );
      if (failedMessage) {
        // Remove failed message and resend
        setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
        sendMessage(failedMessage.content);
      }
    },
    [messages, sendMessage]
  );

  return {
    messages,
    sessionId,
    isTyping,
    isPending: sendMessageMutation.isPending,
    isEscalating: escalateMutation.isPending,
    isEscalated: escalateMutation.isSuccess,
    lastTicket,
    sendMessage,
    escalateToHuman,
    clearChat,
    retryMessage,
  };
};

/**
 * Hook to fetch chat history
 */
export const useChatHistory = (sessionId?: string) => {
  return useQuery({
    queryKey: ['chat', 'history', sessionId],
    queryFn: () => chatService.getHistory(sessionId),
    enabled: !!sessionId,
  });
};
