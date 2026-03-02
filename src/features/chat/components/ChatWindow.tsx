import { FC, useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { MessageCircle, Package, Truck, Wrench, ChevronRight } from 'lucide-react';
import type { LocalMessage } from '../types/chat.types';

interface ChatWindowProps {
  messages: LocalMessage[];
  isTyping?: boolean;
  onRetry?: (messageId: string) => void;
  onSuggestionClick?: (message: string) => void;
}

interface SuggestionItem {
  icon: FC<{ className?: string }>;
  title: string;
  message: string;
}

const SUGGESTIONS: SuggestionItem[] = [
  {
    icon: Package,
    title: 'Products',
    message: 'What products do you offer for semi-trucks?',
  },
  {
    icon: Truck,
    title: 'Compatibility',
    message: 'How do I check if a part fits my truck?',
  },
  {
    icon: Wrench,
    title: 'Installation',
    message: 'Tell me about installation requirements',
  },
];

export const ChatWindow: FC<ChatWindowProps> = ({
  messages,
  isTyping = false,
  onRetry,
  onSuggestionClick,
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
          <div className="inline-flex items-center justify-center w-16 h-16 mb-5 rounded-full bg-white/5 border border-white/10">
            <MessageCircle className="w-8 h-8 text-white/60" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">
            How can we help you?
          </h2>
          <p className="text-white/40 text-sm max-w-xs mx-auto">
            Ask about 12GA products, specifications, or compatibility.
          </p>
        </div>

        {/* Suggestion cards */}
        <div className="w-full max-w-sm space-y-2">
          {SUGGESTIONS.map((suggestion, index) => {
            const Icon = suggestion.icon;
            return (
              <button
                key={index}
                onClick={() => onSuggestionClick?.(suggestion.message)}
                className="group w-full flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-xl hover:bg-[#222] transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-white/50" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm text-white/80 group-hover:text-white transition-colors">
                    {suggestion.message}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors" />
              </button>
            );
          })}
        </div>
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
