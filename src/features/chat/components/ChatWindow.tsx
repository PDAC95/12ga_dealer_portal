import { FC, useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { MessageCircle } from 'lucide-react';
import type { LocalMessage } from '../types/chat.types';

interface ChatWindowProps {
  messages: LocalMessage[];
  isTyping?: boolean;
  onRetry?: (messageId: string) => void;
}

export const ChatWindow: FC<ChatWindowProps> = ({
  messages,
  isTyping = false,
  onRetry,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {/* Hero content */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-5 rounded-full bg-surface border border-border">
            <MessageCircle className="w-8 h-8 text-text-secondary" />
          </div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            How can we help you?
          </h2>
          <p className="text-muted text-sm max-w-xs mx-auto">
            Ask about 12GA products, specifications, or compatibility.
          </p>
        </div>

        {/* Prompt to type */}
        <p className="text-muted text-xs mt-2">
          Type your question below to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-4">
      <div className="w-full max-w-4xl mx-auto flex flex-col">
        {messages.map((message, index) => (
          <MessageBubble
            key={message.id}
            message={message}
            onRetry={onRetry}
            isFirstInGroup={index === 0 || messages[index - 1]?.role !== message.role}
            isLastInGroup={index === messages.length - 1 || messages[index + 1]?.role !== message.role}
          />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} className="h-2" />
      </div>
    </div>
  );
};
