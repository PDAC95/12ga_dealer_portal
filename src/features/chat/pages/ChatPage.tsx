import { FC, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChatWindow, ChatInput, EscalationBanner } from '../components';
import { useChat } from '../hooks/useChat';
import { MessageCircle, Zap } from 'lucide-react';

export const ChatPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialMessageSent = useRef(false);

  const {
    messages,
    isTyping,
    isPending,
    isEscalating,
    isEscalated,
    sendMessage,
    escalateToHuman,
    retryMessage,
    sessionId,
  } = useChat();

  // Show escalation option after a few messages
  const shouldShowEscalation = messages.length >= 4 && !isEscalated;

  const handleEscalate = () => {
    escalateToHuman('User requested human support');
  };

  // Handle product query from URL params (when coming from product detail page)
  const productName = searchParams.get('product');
  const initialMessage = searchParams.get('message');

  useEffect(() => {
    // Auto-send initial message about product when coming from product page
    if (productName && initialMessage && !initialMessageSent.current && !isPending) {
      initialMessageSent.current = true;
      sendMessage(initialMessage);
      // Clear the URL params after sending
      setSearchParams({});
    }
  }, [productName, initialMessage, sendMessage, setSearchParams, isPending]);

  return (
    <div className="flex flex-col h-[calc(100vh-9rem)] lg:h-[calc(100vh-4rem)] relative bg-background -mx-4 lg:-mx-8 -mb-20 lg:-mb-4">
      {/* Header */}
      <div className="relative z-10 px-4 lg:px-6 py-4 border-b border-border">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/25">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            {/* Online indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
              <Zap className="w-2 h-2 text-white" />
            </div>
          </div>

          {/* Title & Status */}
          <div className="flex-1">
            <h1 className="text-lg font-bold text-text-primary">12GA Support</h1>
            <p className="text-xs text-text-secondary mt-0.5">
              {isEscalated
                ? 'Connected to support team'
                : productName
                ? `Discussing: ${productName}`
                : 'Always here to help'}
            </p>
          </div>

          {/* Session Badge */}
          {sessionId && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-surface rounded-xl border border-border">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-[10px] font-medium text-muted uppercase tracking-wider">
                Live
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Escalation banner */}
      {(shouldShowEscalation || isEscalated) && (
        <div className="relative z-10">
          <EscalationBanner
            isEscalating={isEscalating}
            isEscalated={isEscalated}
            onEscalate={!isEscalated ? handleEscalate : undefined}
          />
        </div>
      )}

      {/* Chat messages */}
      <ChatWindow
        messages={messages}
        isTyping={isTyping}
        onRetry={retryMessage}
      />

      {/* Chat input */}
      <ChatInput
        onSend={sendMessage}
        disabled={isPending || isEscalating}
        placeholder={
          isEscalated
            ? 'Message support team...'
            : 'Ask about products, specs, compatibility...'
        }
      />
    </div>
  );
};
