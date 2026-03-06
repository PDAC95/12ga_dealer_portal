import { FC } from 'react';

export const TypingIndicator: FC = () => {
  return (
    <div className="flex items-end gap-2.5 mb-4">
      {/* Avatar */}
      <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
        <span className="text-xs font-bold text-primary">12</span>
      </div>

      {/* Typing bubble */}
      <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-surface">
        <div className="flex items-center gap-1.5">
          {/* Animated dots */}
          <span className="w-2 h-2 bg-muted rounded-full animate-bounce [animation-delay:0ms]" />
          <span className="w-2 h-2 bg-muted rounded-full animate-bounce [animation-delay:150ms]" />
          <span className="w-2 h-2 bg-muted rounded-full animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
};
