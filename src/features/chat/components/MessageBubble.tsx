import { FC, useState } from 'react';
import { AlertCircle, RefreshCw, Check, CheckCheck, X } from 'lucide-react';
import type { LocalMessage } from '../types/chat.types';

interface MessageBubbleProps {
  message: LocalMessage;
  onRetry?: (messageId: string) => void;
  isFirstInGroup?: boolean;
  isLastInGroup?: boolean;
}

export const MessageBubble: FC<MessageBubbleProps> = ({
  message,
  onRetry,
  isFirstInGroup = true,
  isLastInGroup = true,
}) => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';
  const hasAttachments = message.attachments && message.attachments.length > 0;
  const hasContent = message.content.trim().length > 0;

  if (isSystem) {
    return (
      <div className="flex justify-center my-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          <p className="text-xs font-medium text-white/70">{message.content}</p>
        </div>
      </div>
    );
  }

  // Calculate border radius based on position in group
  const getBubbleRadius = () => {
    if (isUser) {
      if (isFirstInGroup && isLastInGroup) return 'rounded-2xl rounded-br-sm';
      if (isFirstInGroup) return 'rounded-2xl rounded-br-sm';
      if (isLastInGroup) return 'rounded-2xl rounded-tr-sm rounded-br-sm';
      return 'rounded-xl rounded-r-sm';
    } else {
      if (isFirstInGroup && isLastInGroup) return 'rounded-2xl rounded-bl-sm';
      if (isFirstInGroup) return 'rounded-2xl rounded-bl-sm';
      if (isLastInGroup) return 'rounded-2xl rounded-tl-sm rounded-bl-sm';
      return 'rounded-xl rounded-l-sm';
    }
  };

  return (
    <>
      <div
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} ${
          isLastInGroup ? 'mb-4' : 'mb-0.5'
        }`}
      >
        <div
          className={`flex items-end gap-2.5 max-w-[80%] ${
            isUser ? 'flex-row-reverse' : 'flex-row'
          }`}
        >
          {/* Avatar - only show for last message in group */}
          {!isUser && isLastInGroup && (
            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-primary">12</span>
            </div>
          )}
          {!isUser && !isLastInGroup && <div className="w-7" />}

          {/* Message content */}
          <div className="flex flex-col gap-1">
            {/* Attachments */}
            {hasAttachments && (
              <div
                className={`flex gap-1 flex-wrap ${
                  isUser ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.attachments!.map((attachment) => (
                  <button
                    key={attachment.id}
                    onClick={() => setLightboxImage(attachment.preview)}
                    className="relative group rounded-xl overflow-hidden bg-white/5 hover:opacity-90 transition-opacity"
                  >
                    <img
                      src={attachment.preview}
                      alt={attachment.name}
                      className={`object-cover ${
                        message.attachments!.length === 1
                          ? 'max-w-[240px] max-h-[240px]'
                          : 'w-24 h-24'
                      }`}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Text bubble */}
            {hasContent && (
              <div
                className={`relative px-4 py-2.5 ${getBubbleRadius()} ${
                  isUser
                    ? 'bg-primary text-white'
                    : 'bg-[#1a1a1a] text-white/90'
                } ${message.isPending ? 'opacity-60' : ''} ${
                  message.isError
                    ? 'bg-red-500/10 border border-red-500/30'
                    : ''
                }`}
              >
                {/* Message text */}
                <p className="text-[14px] whitespace-pre-wrap break-words leading-relaxed">
                  {message.content}
                </p>

                {/* Error indicator */}
                {message.isError && (
                  <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-red-500/20">
                    <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                    <span className="text-xs text-red-400">Failed to send</span>
                  </div>
                )}
              </div>
            )}

            {/* Only attachments, no text - show minimal error state */}
            {!hasContent && hasAttachments && message.isError && (
              <div className="flex items-center gap-1.5 px-2 py-1 bg-red-500/10 border border-red-500/30 rounded-lg">
                <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                <span className="text-xs text-red-400">Failed to send</span>
              </div>
            )}

            {/* Timestamp and status - only show for last in group */}
            {isLastInGroup && (
              <div
                className={`flex items-center gap-1.5 px-1 ${
                  isUser ? 'justify-end' : 'justify-start'
                }`}
              >
                <span className="text-[10px] text-white/30">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>

                {isUser && !message.isError && !message.isPending && (
                  <CheckCheck className="w-3 h-3 text-white/40" />
                )}

                {isUser && message.isPending && (
                  <Check className="w-3 h-3 text-white/20" />
                )}
              </div>
            )}
          </div>

          {/* Retry button for failed messages */}
          {message.isError && onRetry && (
            <button
              onClick={() => onRetry(message.id)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              title="Retry"
            >
              <RefreshCw className="w-4 h-4 text-white/50" />
            </button>
          )}
        </div>
      </div>

      {/* Image lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={lightboxImage}
            alt="Enlarged view"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};
